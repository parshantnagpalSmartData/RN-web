package com.actnursesportal;


import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.christopherdro.RNPrint.RNPrintPackage;
import com.wix.interactable.Interactable;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.BV.LinearGradient.LinearGradientPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.christopherdro.RNPrint.RNPrintPackage;



public class MainApplication extends NavigationApplication {

            @Override
    protected ReactGateway createReactGateway() {
               ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                                return "index";
                           }
        };
               return new ReactGateway(this, isDebug(), host);
            }

            @Override
    public boolean isDebug() {
                return BuildConfig.DEBUG;
            }

            protected List<ReactPackage> getPackages() {
                // Add additional packages you require here
                        // No need to add RnnPackage and MainReactPackage
                                return Arrays.<ReactPackage>asList(
                            // eg. new VectorIconsPackage()
                                        new LinearGradientPackage(),
                                        new SplashScreenReactPackage(),
                                        new RNFetchBlobPackage(), 
                                        new RCTPdfView(),
                                        new Interactable(),
                                        new RNPrintPackage()
                                );
            }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
                return getPackages();
            }
        }