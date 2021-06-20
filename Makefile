front:
	cd front_end/best_price && npm start

back:
	cd back_end && npm start

depend:
	rm -rf front_end/best_price/node_modules
	rm -rf back_end/node_modules
	cd front_end/best_price && npm install
	cd back_end && npm install
