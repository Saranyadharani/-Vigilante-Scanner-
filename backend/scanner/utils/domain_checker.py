import whois
from datetime import datetime
import time
import logging

# Set up logging to see errors
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_domain_age(domain):
    """
    Get domain age with robust error handling and retries
    """
    max_retries = 2
    retry_delay = 1  # seconds
    
    for attempt in range(max_retries):
        try:
            logger.info(f"Attempt {attempt + 1} to get WHOIS for: {domain}")
            
            # Query WHOIS information
            domain_info = whois.whois(domain)
            
            # Get creation date (handle cases where it might be a list)
            creation_date = domain_info.creation_date
            
            # Debug: Print what we received
            logger.info(f"Raw creation_date: {creation_date}")
            logger.info(f"Type: {type(creation_date)}")
            
            if creation_date:
                # Handle list of dates
                if isinstance(creation_date, list):
                    creation_date = creation_date[0]
                    logger.info(f"Using first date from list: {creation_date}")
                
                # Ensure it's a datetime object
                if isinstance(creation_date, str):
                    try:
                        creation_date = datetime.strptime(creation_date, '%Y-%m-%d %H:%M:%S')
                    except:
                        creation_date = datetime.strptime(creation_date, '%Y-%m-%d')
                
                # Calculate age in years
                age_delta = datetime.now() - creation_date
                age_years = age_delta.days / 365.25
                
                result = {
                    'age': int(age_years),
                    'created': creation_date.strftime('%Y-%m-%d'),
                    'registrar': domain_info.registrar or 'Unknown',
                    'expiration': domain_info.expiration_date.strftime('%Y-%m-%d') if domain_info.expiration_date else 'Unknown'
                }
                
                logger.info(f"✅ Success: {domain} is {result['age']} years old")
                return result
            else:
                logger.warning(f"❌ No creation date found for: {domain}")
                return {'age': 0, 'error': 'Creation date not found in WHOIS'}
                
        except whois.parser.PywhoisError as e:
            logger.error(f"WHOIS parsing error for {domain}: {e}")
            if "No match" in str(e):
                return {'age': 0, 'error': 'Domain not found in WHOIS'}
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
                continue
            return {'age': 0, 'error': f'WHOIS error: {str(e)}'}
            
        except Exception as e:
            logger.error(f"Unexpected error for {domain}: {e}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
                continue
            return {'age': 0, 'error': f'Unexpected error: {str(e)}'}
    
    return {'age': 0, 'error': 'Max retries exceeded'}
