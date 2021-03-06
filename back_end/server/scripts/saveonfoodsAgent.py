from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time
from threading import Thread

result = []

def make_url(search):
  '''
  Builds the url from the given Search keyword
  :param search (string): the keyword to search
  :return add: url of the search page
  '''
  base = 'https://www.saveonfoods.com/sm/pickup/rsid/987/results?q='
  search = search.split()
  # Build the relevant format of the URL
  add = base + search[0]
  if len(search) > 1:
    for i in range(1, len(search)):
      add += '+'
      add += search[i] 
  return add


def get_substring(text, beg, end):
  word = ''
  for i in range(beg, end):
    word = word + text[i]
  return word

def process_text(priceText):
  '''
  processed the text and obtains different fields from it
  :param priceText: string containing information about the price
  '''
  textPassed = '' 
  for i in range(0, len(priceText)):
    textPassed = textPassed + priceText[i]
  priceText = textPassed
  processed = {}
  firstNo = 0
  lastNo = len(priceText)
  flag1 = 0
  flag2 = 0
  for i in range(0, len(priceText)):
    if flag1 == 0 and priceText[i].isdigit():
      firstNo = i
      flag1 = 1
    if flag1 == 1 and flag2 == 0 and priceText[i].isdigit():
      lastNo = i + 1
    if priceText[i] == '.' and flag1 == 1 and i < len(priceText) and priceText[i+1].isdigit():
      pass
    elif flag1 == 1 and priceText[i].isdigit() == False:
      flag2 = 1
  try:
    cur = priceText[0: firstNo]
    price = priceText[firstNo: lastNo]
    if lastNo >= len(priceText):
      units = ''
    else:
      units = priceText[lastNo: len(priceText)]
    processed["cur"] = cur
    processed["price"] = round(float(price),2)
    processed["units"] = units
  except Exception as e:
    print("[Exception]", e)
  return processed
  pass


def build_object(searchKey, priceText):
  '''
  Build the final object after analysing all the obtained
  '''
  itemObj = {}
  itemObj["item"] = searchKey
  processed = process_text(priceText)
  for key, value in  processed.items():
    itemObj[key] = value
  return itemObj
  pass

def query_price(search):
  global result
  # Get a valid url
  url = make_url(search)
  opts = Options()
  opts.add_argument(" --headless")
  opts.binary_location= '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' 
  chrome_driver = os.getcwd() +"/chromedriverm1"
  driver = webdriver.Chrome(options=opts, executable_path=chrome_driver)
  try:
    driver.get(url)
    # print(innerHTML.get_attribute("innerText"))
    # Sleep is required to give time to the browser to render the HTML after executing all the scripts
    time.sleep(0.1)
    # Get the per pound price of the item
    item_list = driver.find_elements_by_css_selector('span.ProductCardPrice-sc-zgh1l1.dfxUih')
    # itemObj = {'item': search, 'price': item_list[0].text}
    itemObj = build_object(search, item_list[0].text)
    result.append(itemObj)
    # print(search + ',' + item_list[0].text) TODO Can be used to print the price
  except Exception as e:
    print("[Exception]", e)
  finally:
    driver.quit()


def get_saveonfoods_prices(items):
  '''
  Prints out the price of items
  :param items: list of items to query
  :returns result The list of prices
  '''
  global result
  # Start individual threads to make queries
  list_threads = []
  for i in range(0, len(items)):
    new_thread = Thread(target=query_price, args=(items[i],))
    list_threads.append(new_thread)
    new_thread.start()
  for query_threads in list_threads:
    query_threads.join()
  return result

if __name__ == '__main__':
  itemList = ["Apple","mango","carrot","grapes","banana", "melon", "milk", "watch"]
  print(get_saveonfoods_prices(itemList))