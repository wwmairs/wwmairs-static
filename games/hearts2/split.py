def write(file):
	line = str(avery) + "," + str(adam) + "," + str(phil) + "," + str(will) + "\n"
	file.write(line)	

avery = 0
adam = 0
phil = 0
will = 0

sum = open("sum.csv", "w")
sum.write("avery,adam,phil,will\n")

with open("scores.csv", "r") as games:
	write(sum)
	games.next()
	for line in games:
		scores = line.split(",")
		avery += int(scores[0])
		adam  += int(scores[1])
		phil  += int(scores[2])
		will  += int(scores[3])
		write(sum)	

sum.close()

