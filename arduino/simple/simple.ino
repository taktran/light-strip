// NeoPixel Ring simple sketch (c) 2013 Shae Erisson
// released under the GPLv3 license to match the rest of the AdaFruit NeoPixel library

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN            6

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS      30

// When we setup the NeoPixel library, we tell it how many pixels, and which pin to use to send signals.
// Note that for older NeoPixel strips you might need to change the third parameter--see the strandtest
// example for more information on possible values.
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

uint32_t blankColor = pixels.Color(0,0,0);
int DELAY_VAL = 200; // delay for half a second

void setup() {
  pixels.begin(); // This initializes the NeoPixel library.
}

void loop() {
  uint32_t green = pixels.Color(0,50,0);
  uint32_t red = pixels.Color(50,0,0);
  uint32_t blue = pixels.Color(0,0,50);
  uint32_t orange = pixels.Color(170,60,10);
  
//  moveOneForward(red, DELAY_VAL);
//  moveOneBackward(red, DELAY_VAL);

  colorWipe(green, DELAY_VAL);
  clearColor(1000);
  
  colorWipe(red, DELAY_VAL);
  clearColor(1000);
}

void clearColor(int delayVal) {
  pixels.clear();
}

// Fill the entire strip with a color
void colorFill(uint32_t color) {
  for(int i = 0; i < pixels.numPixels(); i++) {
    pixels.setPixelColor(i, color); 
  }

  pixels.show();
}

void moveOneBackward(uint32_t color, int delayVal) {
  int lastPixel = pixels.numPixels() - 1;
  for(int i = lastPixel; i >= 0; i--) {

    int prevPixel = i + 1;
    if (prevPixel <= lastPixel) {
      pixels.setPixelColor(i + 1, blankColor); // Moderately bright green color.
    }

    // pixels.Color takes RGB values, from 0,0,0 up to 255,255,255
    pixels.setPixelColor(i, color);

    pixels.show(); // This sends the updated pixel color to the hardware.
    
    delay(delayVal);
  }
}

void moveOneForward(uint32_t color, int delayVal) {
  for(int i = 0; i < pixels.numPixels(); i++) {

    int prevPixel = i - 1;
    if (prevPixel >= 0) {
      pixels.setPixelColor(i - 1, blankColor); // Moderately bright green color.
    }

    // pixels.Color takes RGB values, from 0,0,0 up to 255,255,255
    pixels.setPixelColor(i, color);

    pixels.show(); // This sends the updated pixel color to the hardware.
    
    delay(delayVal);
  }
}

void colorWipe(uint32_t color, int delayVal) {
  for(int i = 0; i < pixels.numPixels(); i++) {

    // pixels.Color takes RGB values, from 0,0,0 up to 255,255,255
    pixels.setPixelColor(i, color); // Moderately bright green color.

    pixels.show(); // This sends the updated pixel color to the hardware.
    
    delay(delayVal);
  }

  delay(1000);
}

