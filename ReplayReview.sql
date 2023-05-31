CREATE TABLE Replay_Review_Information (
    Replay_Review_Num INTEGER PRIMARY KEY,
    MC_CCR TEXT,
    RR_ID INT,
    Review_Date DATE,
    Visit TEXT,
    Home TEXT,
    Replay_Official TEXT
);

CREATE TABLE Play_Information (
    Replay_Review_Num INT,
    Inning TEXT,
    Visit_Score_Pre_Play INT,
    Home_Score_Pre_Play INT,
    Score_In_Favor_Of TEXT,
    Outs_Pre_Play INT,
    Runners_Pre_Play TEXT,
    Challenging_Team TEXT,
    Calling_Umpire TEXT,
    Play_Type TEXT,
    Play_Primary_Subtype1 TEXT,
    Play_Location TEXT,
    Call_on_the_Field TEXT,
    FOREIGN KEY (Replay_Review_Num) REFERENCES Replay_Review_Information (Replay_Review_Num)
);

CREATE TABLE Review_Outcome_Information (
	Replay_Review_Num INT,
    Replay_Official_Ruling TEXT,
    Ruling_After_Review TEXT,
    Review_In_Favor_Of TEXT,
    Runs_Scored_Post_Review INT,
    Outs_Post_Review INT,
    Runners_Post_Review TEXT,
    FOREIGN KEY (Replay_Review_Num) REFERENCES Replay_Review_Information (Replay_Review_Num)
);

CREATE TABLE Umpire_Time_Information (
    Replay_Review_Num INT,
    Headset_Umpire_1 TEXT,
    Headset_Umpire_2 TEXT,
    Time_on_2_Minute_Clock TEXT,
    Review_2_Min_Plus BOOLEAN,
    Time_from_Call_to_Challenge TEXT,
    Time_from_Challenge_to_Ruling TEXT,
    Time_on_Headset TEXT,
    Length_of_Initial_Announcement TEXT,
    Length_of_Post_Review_Announcement TEXT,
    Time_from_Call_to_Next_Pitch TEXT,
    Time_from_FTC_EoP_to_Challenge TEXT,
    Time_left_on_FTC_Clock TEXT,
    Multiple_Review BOOLEAN,
    Multiple_Trips_to_Headset BOOLEAN,
    FOREIGN KEY (Replay_Review_Num) REFERENCES Replay_Review_Information (Replay_Review_Num)
);

-- Update boolean columns with "Yes" or "No" values
UPDATE Umpire_Time_Information
SET
    Review_2_Min_Plus = (CASE WHEN Review_2_Min_Plus = 'Yes' THEN TRUE ELSE FALSE END),
    Multiple_Review = (CASE WHEN Multiple_Review = 'Yes' THEN TRUE ELSE FALSE END),
    Multiple_Trips_to_Headset = (CASE WHEN Multiple_Trips_to_Headset = 'Yes' THEN TRUE ELSE FALSE END);
	
CREATE TABLE Definitive_Angles (
    Replay_Review_Num INT,
    Definitive_Angle_1 TEXT,
    Definitive_Angle_2 TEXT,
    Definitive_Angle_3 TEXT,
    FOREIGN KEY (Replay_Review_Num) REFERENCES Replay_Review_Information (Replay_Review_Num)
);