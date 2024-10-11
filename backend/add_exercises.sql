CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(255) NOT NULL
);

INSERT INTO exercises (exercise_name, muscle_group) VALUES
('Push Up', 'Chest'),
('Squat', 'Legs'),
('Deadlift', 'Back'),
('Bench Press', 'Chest'),
('Lunges', 'Legs');
