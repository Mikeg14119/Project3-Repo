# MLB Replay Data Analysis


### Executive Summary
We conducted an analysis of MLB Replay Data from the first month and a half of the season to gain insights into various aspects of replay reviews in Major League Baseball. Our examination covered umpire performance, the most common review types, the most frequent innings for reviews, and which teams have the best track record when challenging a play.

### Introduction


The data for our project was collected whenever a Replay Review was initiated in an MLB game. It includes play-state information, play descriptions, timing details, umpire information, and various other data points. We sought to extract meaningful insights from this information to better understand the dynamics of replay reviews in the MLB.


### Data Collection and Preparation


The data is collected each night at the MLB's Replay Operations Center in New York City whenever a replay review is triggered. After confirming the nightly data, it is appended to the current season's Master spreadsheet. To prepare the data for analysis, we examined the file and removed irrelevant columns that were not pertinent to our research questions.

Once the unnecessary columns were removed, we split the Excel file into five separate but related CSV files. These files serve as the source of information for the tables created in the SQL database. The five tables are: Play_Information.csv, Replay_Review_Information.csv, Review_Outcome_Information.csv, Umpire_Time_Information.csv, and Definitive_Angles.csv. The Replay_Review_Num was used as a primary key, linking all tables together.

Subsequently, we created a database named ReplayReview.db in SQL with the appropriate schema to match the data from the CSV files. To access and transform the data to the proper JSON format, we built a Python Flask API.


### Data Analysis


#### Umpire Performance

We created a dropdown that allows users to select a calling umpire from the play_information.json file and then display the statistics associated with their reviews. We calculated the total number of reviews for each umpire and the percentages of Overturned, Stands, and Confirmed rulings. From these calculations, we determined the most accurate umpires over the course of the season.


#### Most Common Review Type and Inning

To answer the question of the most common review type and inning, we created a Pie Chart and a Bar Chart. The Pie Chart displays the distribution of review types, and the Bar Chart shows the number of reviews initiated in each inning. Both visualizations use data from the Play_Information table in our database.


#### Successful Challenging Teams

To determine which clubs, franchises, or managers have the best track record when requesting a review, we created a Bar Chart using the D3 library in JavaScript. The chart visualizes the number of Overturned, Stands, and Confirmed rulings for each challenging team, using data from the Play_Information and Review_Outcome_Information tables.


### Conclusion


In conclusion, our analysis yielded valuable insights into MLB Replay Data:


#### Umpire Performance

We found a total of 85 umpires with reviewed calls. Many Gonzalez had the most reviewed calls with 11. Among umpires with 7 or more calls reviewed, Bill Miller (75% Overturned) and Tony Randazzo (71% Overturned) had the lowest accuracy, while Ryan Blakney saw 55% Confirmed and 22% Stands determinations out of 9 reviewed calls.


#### Most Common Review Type and Inning

Tag plays were the most commonly reviewed play types with 124 reviews, followed closely by Force plays with 114 reviews. The top of the 9th inning and both sides of the 8th inning were the most common for reviews, with the bottom of the 9th ranking fifth behind the top of the 7th.


#### Successful Challenging Teams

Houston led with 8 Overturned calls, but Crew Chief Reviews (N/A) also had 8, although they are initiated automatically and occur more frequently. Considering the number of Overturned calls relative to Stands and Confirmed rulings, the most successful challenging teams were Houston, Miami, and San Francisco, while the New York Yankees, San Diego Padres, and Pittsburgh Pirates had a higher ratio of negative results.
