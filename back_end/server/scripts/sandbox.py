
def process_text(priceText):
  '''
  processed the text and obtains different fields from it
  :param priceText: string containing information about the price
  ''' 
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
    processed["price"] = float(price)
    processed["units"] = units
  except Exception as e:
    print("[Exception]", e)
  return processed
  pass

while True:
  a = input()
  print(process_text(a))