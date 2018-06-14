# compiles csv two scores
# expecting names in first row
# and rankings in following rows

import sys
import json

with open(sys.argv[1], 'r') as readfile:
	players = []
	firstline = readfile.readline().strip()
	names = firstline.split(',')
	num_players = len(names)
	for name in names:
		players.append({'name': name, 
										'scores': [0 for x in range(num_players)],
										'total_score': 0})	
	for line in readfile:
		places = line.split(',')
		for i, p in enumerate(places):
			# add to scores array for respective player
			# scores is an array where the first element 
			# is the number of first places,
			# the second the number of second places ...
			place = int(p)
			players[i]["scores"][place - 1] += 1
			players[i]["total_score"] += place
		

with open(sys.argv[2], 'w') as writefile:
	print(json.dumps(players))
	writefile.write(json.dumps(players))

