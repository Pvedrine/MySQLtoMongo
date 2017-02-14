#!/usr/bin/python
# -*- coding: utf-8 -*-
import MySQLdb #MySQL lib
import json #json lib
import collections
import subprocess


#connection to the MySQL database 
db = MySQLdb.connect(host="mysql-server-1", #host
					 user="pv7", #username
					 passwd="abcpv7354", #hardcoded password /!\
					 db="movielens") #name of db

#creation of a Cursor
cur = db.cursor()

#function that get a table and return a json file
def getTableToJSOn(SetofArg, NameOfTable) :
	rows = list ()
	try:
		#sql query                    each row from the set  
		cur.execute("SELECT " + ', '.join(str(arg) for arg in SetofArg) + " FROM " + NameOfTable)
		rows = cur.fetchall()
	#~ #handling errors
	except MySQLdb.Error, e:
		try:
			print "Error [%d] : %s" % (e.args[0], e.args[1])
		except IndexError:
			print "Error %s" % str(e)
	
	# getting the data into a dict		
	row_list = []
	for row in rows:
		d = collections.OrderedDict()
		i = 0
		for arg in SetofArg :
			d[arg] = row[i]
			i += 1
		row_list.append(d)
	#dumping the dict into a json file
	j = json.dumps(row_list, ensure_ascii=False, encoding='utf-8') #For reaons, we need to put false to ensure ascii and add the encoding utf-8 here despite we have set the encoding before...
	nameoffile = NameOfTable + ".json"								# Otherwise it would raise an error Unicode Decode : utf8 codec can't decode byte
	f = open(nameoffile, 'w')
	print >> f, j
	print ("Saved %s" % nameoffile) #saving the file

#function to import a jsonfile into mongo
def Tomongo(jsonfile):
	BashCommand = "mongoimport --db pv7 -u pv7 --host mongo-server-1 --authenticationDatabase pv7 --collection movielens --file " + jsonfile + " --jsonArray"
	process = subprocess.Popen(BashCommand.split(), stdout=subprocess.PIPE)
	output, error = process.communicate()



#getting the data from the tables into a json file, first arg is a array of the rows and the second arg is the name og the table
getTableToJSOn(['title', 'release_date', 'video', 'IMDBURL'], "movies")
getTableToJSOn(['genre'], "genres")
getTableToJSOn(['id', 'age', 'gender', 'occupation', 'zip_code'], "users")
getTableToJSOn(['user', 'movie', 'rating', 'timestamp'], "ratings")

#execution of a bash command to add the JSOn files into MongoDB
print ("Importing JSON files into MongoDB")

#the bash command is reapeated for each file, so we need to type the password 4 times
for f in ['movies.json', 'genres.json', 'users.json', 'ratings.json']:
	Tomongo(f)

cur.close()
db.close()
