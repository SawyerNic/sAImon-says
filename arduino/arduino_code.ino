const int leftButton = 3;
const int rightButton = 5;
const int buzzer = A5;
const int joystickY = A2;
const int joystickX = A3;
const int startButton = 7;

int leftPressed;
int rightPressed;
int joystickYAngle;
int joystickXAngle;
int startPressed;
int buzzInterval = 700; //in millis

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(leftButton, INPUT);
  pinMode(rightButton, INPUT);
  pinMode(joystickX, INPUT);
  pinMode(joystickY, INPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  leftPressed = digitalRead(leftButton);
  rightPressed = digitalRead(rightButton);
  startPressed = digitalRead(startButton);
  joystickXAngle = analogRead(joystickX);
  joystickYAngle = analogRead(joystickY);
  if(startPressed == HIGH){
    Serial.println("start pressed");
    delay(500);
  }
  if(leftPressed == HIGH){
    Serial.println("left button pressed");
    delay(500);
  }
  if(rightPressed == HIGH){
    Serial.println("right button pressed");
    delay(500);
  }
  if(joystickXAngle<400){
    Serial.println("stick left");
    delay(500);
  }
  if(joystickYAngle<400){
    Serial.println("stick down");
    delay(500);
  }
  if(joystickYAngle>700){
    Serial.println("stick up");
    delay(500);
  }
  if(joystickXAngle>700){
    Serial.println("stick right");
    delay(500);
  }
}