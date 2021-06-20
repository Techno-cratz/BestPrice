from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time

url = 'https://voila.ca/products/search?q=apple'

opts = Options()
opts.add_argument(" --headless")
opts.binary_location= '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' 
chrome_driver = os.getcwd() +"/chromedriver"
driver = webdriver.Chrome(options=opts, executable_path=chrome_driver)
# driver = webdriver.Chrome(chrome_driver)

driver.get(url)
print(driver.title)
item_list = driver.find_elements_by_css_selector('strong.base__Price-sc-7vdzdx-24.brSVee')
# print(driver.page_source)
# for item in item_list:
print(item_list[0].text)
driver.quit()
