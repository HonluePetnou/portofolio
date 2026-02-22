import requests
import json

def test_endpoints():
    base_url = "http://localhost:8000"
    
    print("Testing API endpoints...")
    
    # Test projects endpoint with filters
    print("\n1. Testing Projects endpoint with filters:")
    try:
        # Test basic projects
        response = requests.get(f"{base_url}/projects/me")
        print(f"   Basic projects: {response.status_code}")
        
        # Test with search
        response = requests.get(f"{base_url}/projects/me?search=test")
        print(f"   Projects with search: {response.status_code}")
        
        # Test with industry filter
        response = requests.get(f"{base_url}/projects/me?industry=tech")
        print(f"   Projects with industry filter: {response.status_code}")
        
        # Test with featured filter
        response = requests.get(f"{base_url}/projects/me?is_featured=true")
        print(f"   Projects with featured filter: {response.status_code}")
        
    except Exception as e:
        print(f"   Error: {e}")
    
    # Test testimonials endpoint with search
    print("\n2. Testing Testimonials endpoint with search:")
    try:
        # Test basic testimonials
        response = requests.get(f"{base_url}/testimonials/me")
        print(f"   Basic testimonials: {response.status_code}")
        
        # Test with search
        response = requests.get(f"{base_url}/testimonials/me?search=john")
        print(f"   Testimonials with search: {response.status_code}")
        
        # Test with rating filter
        response = requests.get(f"{base_url}/testimonials/me?rating=5")
        print(f"   Testimonials with rating filter: {response.status_code}")
        
    except Exception as e:
        print(f"   Error: {e}")
    
    # Test articles endpoint with filters
    print("\n3. Testing Articles endpoint with filters:")
    try:
        # Test basic articles
        response = requests.get(f"{base_url}/articles")
        print(f"   Basic articles: {response.status_code}")
        
        # Test with search
        response = requests.get(f"{base_url}/articles?search=fastapi")
        print(f"   Articles with search: {response.status_code}")
        
        # Test with published filter
        response = requests.get(f"{base_url}/articles?published_filter=true")
        print(f"   Articles with published filter: {response.status_code}")
        
        # Test with tag filter
        response = requests.get(f"{base_url}/articles?tag=python")
        print(f"   Articles with tag filter: {response.status_code}")
        
    except Exception as e:
        print(f"   Error: {e}")
    
    print("\n✅ Endpoint testing completed!")

if __name__ == "__main__":
    test_endpoints()
