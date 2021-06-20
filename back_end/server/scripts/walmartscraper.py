from selenium import webdriver
from selenium.common import exceptions
import pandas as pd
# search-result-gridview-item-wrapper
# class="product-price-with-fulfillment"
browser = webdriver.Chrome('D:\DOWNLOADS\Setups\ChromeDriver\chromedriver.exe')


item_name = input('What do you want to search for? ')
item_name_words = []
word = ""
count = 0
item_url = 'https://www.walmart.ca/search?q='

for letter in item_name:
    count+=1
    if letter == " ":
        item_name_words.append(word)
        word = ""

    elif count == len(item_name):
        word+=item_name[-1]
        item_name_words.append(word)

    else:
        word+=letter

if len(item_name_words) == 1:
    item_url+=item_name

else:
    for i in range(len(item_name_words)-1):
        item_url+=item_name_words[i]
        item_url+= '%20'
    
    item_url+=item_name_words[-1]

print(item_url)
browser.get(item_url)
item_list = browser.find_elements_by_css_selector('span.css-2vqe5n.esdkp3p0')

print(item_list[0].text)
