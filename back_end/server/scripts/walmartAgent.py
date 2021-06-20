from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time

def make_url(search):
    count = 0
    word = ""
    item_name_words = []
    item_url = 'https://www.walmart.ca/search?q='
    for letter in search:
        count+=1
        if letter == " ":
            item_name_words.append(word)
            word = ""

        elif count == len(search):
            word+=search[-1]
            item_name_words.append(word)

        else:
            word+=letter

    if len(item_name_words) == 1:
        item_url+=search

    else:
        for i in range(len(item_name_words)-1):
            item_url+=item_name_words[i]
            item_url+= '%20'
        
        item_url+=item_name_words[-1]


    return item_url

def query_price(search):
    url = make_url(search)
    # opts = Options()
    # opts.add_argument(" --headless")
    # opts.binary_location= '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' 
    chrome_driver = os.getcwd() +"/chromedriver"
    # browser = webdriver.Chrome(options=opts, executable_path=chrome_driver)
    browser = webdriver.Chrome(chrome_driver)
    browser.get(url)
    item_list = browser.find_elements_by_css_selector('span.css-2vqe5n.esdkp3p0')
    print(len(item_list))
    return item_list[0].text

def get_walmart_prices(items):
    result = []
    for item in items:
        item_price = query_price(item)
        result.append({"item": item, 'price': item_price})
        time.sleep(1)
    return result


itemz = ["banana", "apple", "mango"]
print(get_walmart_prices(itemz))