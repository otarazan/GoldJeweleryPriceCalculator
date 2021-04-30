cd C:\repo\GoldJeweleryPriceCalculator
ionic build
ionic capacitor  build android --prod --releas
ionic cap copy
ionic cap sync
cd android
gradlew assembleRelease
cd app/build/outputs/apk/release
jarsigner -keystore C:\repo\GoldJeweleryPriceCalculator\my-release-key.jks -storepass maria123 app-release-unsigned.apk my-alias
zipalign -v 4 app-release-unsigned.apk app-release.apk






cd C:\repo\GoldJeweleryPriceCalculator
#keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
#cd C:\repo\GoldJeweleryPriceCalculator\android\app\build\outputs\apk\release\