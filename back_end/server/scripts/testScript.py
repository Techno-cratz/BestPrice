import json
from threading import Thread
from superstoreAgent import get_super_prices
from saveonfoodsAgent import get_saveonfoods_prices
from voilaAgent import get_voila_prices

items = [
  'apple', 'brown rice', 'grapes', 'milk', 'carrots', 'chicken', 'pasta'
]
resSuperstore = []
resSaveOnFoods = []
resVoila = []

def check_superstore():
  '''
  Checks the price of items at superstore
  '''
  global items
  global resSuperstore
  # print("****Superstore Prices***")
  result = get_super_prices(items)
  resSuperstore = result
  return result

def check_saveonfoods():
  '''
  Checks the prices of the items on save on foods
  '''
  global items
  global resSaveOnFoods
  result = get_saveonfoods_prices(items)
  resSaveOnFoods = result
  return result

def check_voila():
  '''
  Checks the prices of the items on save voila
  '''
  global items
  global resVoila
  result = get_voila_prices(items)
  resVoila = result
  return result

def load_items():
  '''
  Loads items from the json file
  :param None
  :returns None
  '''
  global items
  # Read the json file
  try:
    with open('./data/query.json') as infile:
      data = json.load(infile)
      items = data['items']
  except Exception as e:
    print("[Exception]", e)
  
def dump_items(data):
  '''
  Writes the data to the json file
  :param data: The data to write file
  :returns None
  '''
  try:
    with open('./data/result.json', 'w') as outfile:
      json.dump(data, outfile)
  except Exception as e:
    print("[Exception]", e)

def cal_total(data):
  total = 0
  for item in data:
    total  = total + item["price"]
  return total

if __name__ == '__main__':
  list_threads = []
  load_items()
  print(items)
  new_thread = Thread(target=check_superstore, args=tuple())
  list_threads.append(new_thread)
  new_thread.start()
  new_thread = Thread(target=check_saveonfoods, args=tuple())
  list_threads.append(new_thread)
  new_thread.start()
  new_thread = Thread(target=check_voila, args=tuple())
  list_threads.append(new_thread)
  new_thread.start()
  for query_thread in list_threads:
    query_thread.join()
  # resSuperstore = check_superstore()
  # resSaveOnFoods = check_saveonfoods()
  result = {'superstore': resSuperstore, 'saveonfoods': resSaveOnFoods, 'voila': resVoila, 
  'superTotal' : cal_total(resSuperstore), 'saveTotal': cal_total(resSaveOnFoods), 'voilaTotal': cal_total(resVoila)}

  dump_items(result)
  
