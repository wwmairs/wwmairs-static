# compiles csv two scores
# expecting names in first row
# and rankings in following rows

import sys

with open(sys.argv[1], 'r') as readfile:
	players = []
	names = readfile[0].split(',')
	num_players = len(names)
  for name in names:
		players.append({'name': name, 'scores': [num_players]})	
	for line in readfile:
		places = line.split(',')
		# add to scores array for respective player
		# scores is an array where the first element 
		# is the number of first places,
		# the second the number of second places ...
		

with open(sys.argv[2], 'w') as writefile:

