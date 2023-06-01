# Project3-Repo
Executive Summary

We gathered MLB Replay Data from the first month and a half of the season to examine what insights we could derive. Areas we looked at were umpire performance, which inning has the most reviews instigated, what review type is the most common, and lastly which team is most successful in calling for a replay review. 


Introduction

The data provided for our project is collected whenever there is a Replay Review initiated in an MLB game. The data contains play-state information, play descriptions, timing information, umpire information, and various other data points. We decided that we could look at this information and glean some insights on reviews in the MLB. 


Data Collection and Preparation

This data is collected each night in the MLB’s Replay Operations Center in New York City whenever a replay review is triggered. Once the nightly data is confirmed it is appended to the current season’s Master spreadsheet. The data is downloaded as a single excel file with close to 50 columns of information. Before doing anything, we examined the file and determined which columns would be irrelevant to the questions we were looking to answer.


Data Exploration and Cleaning

Once any unnecessary columns were removed, we began the process of splitting the excel file into 5 separate but related CSV files. The files were the source of the information for tables we would later create in SQL. The five tables/files are: Play_Information.csv, Replay_Review_Information.csv, Review_Outcome_Information.csv, Umpire_Time_Information.csv, and Definitive_Angles.csv. We made sure that the Replay_Review_Num was a column in each csv file to act as a primary key linking all the tables together.

From there we created a database - ReplayReview.db - in SQL with the appropriate schema to match the data from the csv files. We then built a Python Flask API to extract the data then transform it to the proper JSON format. Now that the data was properly prepared, we could begin our analysis.


Data Analysis

Dropdown Analysis: 

We created a dropdown that could pull the Calling Umpire from the play_information.json file, then reference the result of the replay review from the review_outcome_information.json file. We counted the number of reviews affiliated with each umpire, then calculated the percentages for each result: Overturned, Stands, Confirmed. From those calculations, we can create an index over the course of the season of the most accurate umpires. 

Pie Chart: & 1st Bar Chart:
For the process of answering the question, “What is the most common review type, what inning is the most common for reviews?”, there was a Pie Chart that was made for the first part of the question, and a bar chart for the latter. For both visualizations, only one table from our database was used, Play Information. 

For the creation of the Pie Chart, we used a Chart library on a html canvas. The chart took its data from the ‘Play Type’ column of the table that was used, displaying what reviews were requested by amount, with the option of filtering what review you would want to see in the chart along with the request number. 

For the Bar Chart that was used to answer the second part of the question, a chart library was also used on a html canvas. It used the values from the “Inning” row in the database that was fetched. It displayed in descending order, the number of times an inning was requested for review.


Final Bar Chart:
For the process of answering the question, “What clubs/franchises/managers have the best track record when requesting a review?”, a Bar Chart was made to answer the question, and for that was used two different tables, which were Play Information and Review Outcome Information. 

For the creation of the Bar Chart, we used D3 library on java script. The bar chart took its data from the ‘Challenging Team’ column from the Play information table, and the ‘Replay Official Ruling’ column from Review Outcome Information table. We created the display for the review outcomes in a bar chart visualization so you can have a better sense of the more successful challenging teams. 
Conclusion


We will discuss the conclusion by reviewing the question being asked:

1.	Dropdown: Which umpires are involved with the most replay reviews, and what are the statistics associated with them?
After reviewing the Calling Umpire Statistics we calculated, we found a total of 85 umpires with calls that have been reviewed. We determined that the umpire with the most reviewed calls is Many Gonzalez with 11. Of the umpires with 7 or more calls that have been reviewed, the two least accurate umpires were Bill Miller at 75% (6 of 8 Overturned)and Tony Randazzo at 71% (5 of & Overturned). Ryan Blakney also had a high number of reviewed calls (9), but has seen 55% of them Confirmed and 22% have ended with a Stands determination. 

2.	Pie Chart: What Play Type is the most common one to come to review?
After creating our pie chart, we could see that tag plays were the most commonly reviewed play types at 124 reviews. Force plays were close behind at 114 reviews. Having those two as the most common play types was expected, however the margin between them and the rest was unexpected.

3.	Which inning was the most common for reviews?
Unsurprisingly, the most common innings were the top of the 9th, and both sides of the 8th inning. It is interesting that the bottom of the 9th is the fifth most common inning for reviews, sitting behind the top of the 7th. One would assume that is because a number of games do not make it to that half-inning. Further analysis would maybe determine a ratio of reviews to completed half-innings of that information could be readily found.

4.	Finally, we asked which club was most successful with its challenges?
At overall number of Overturned calls, we have Houston in the lead with 8. Crew Chief Reviews (N/A) also have 8 but those are initiated automatically and happen at a higher frequency so its results are skewed. When comparing the number of Overturned calls, to the Stands and Confirmed rulings it seems that the most successful teams were Houston, Miami, and San Francisco. Meanwhile, the New York Yankees, San Diego Padres, and Pittsburgh Pirates each had a high ratio of negative results.
