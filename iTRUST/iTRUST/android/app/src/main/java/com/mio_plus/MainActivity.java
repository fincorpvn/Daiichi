<<<<<<< HEAD
package com.fplatform.iTRUST;
=======
package com.vinacapital.mio;
>>>>>>> 8d9f0c399d9dbf946a73edad9211041ca403a57c

import android.os.Bundle; // here

import androidx.core.view.WindowCompat;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // here
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    super.onCreate(savedInstanceState);
  };

  @Override
  protected String getMainComponentName() {
<<<<<<< HEAD
    return "iTRUST";
=======
    return "Mio_Plus";
>>>>>>> 8d9f0c399d9dbf946a73edad9211041ca403a57c
  }
}
