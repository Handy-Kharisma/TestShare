Perbedaan antara <b><i>PRESS</i></b> dan <b><i>PRESS-Build</i></b> terdapat pada file-file di folder <b>Android</b> seperti dibawah ini :

- package.json
- android/gradle.properties
- android/app/\_BUCK
- android/app/larona_ess.keystore
- android/app/build.gradle
- android/app/build/generated/source/buildConfig/release/com/larona/employeeselfservice/BuildConfig.java
- android/app/build/intermediates/aapt_proguard_file/release/aapt_rules.txt
- android/app/build/intermediates/compatible_screen_manifest/release/output-metadata.json
- android/app/build/intermediates/manifest_merge_blame_file/release/manifest-merger-blame-release-report.txt
- android/app/build/intermediates/merged_manifest/release/AndroidManifest.xml
- android/app/build/intermediates/merged_manifests/release/output-metadata.json
- android/app/build/intermediates/merged_manifests/release/arm64-v8a/AndroidManifest.xml
- android/app/build/intermediates/merged_manifests/release/armeabi-v7a/AndroidManifest.xml
- android/app/build/intermediates/merged_manifests/release/universal/AndroidManifest.xml
- android/app/build/intermediates/merged_manifests/release/x86/AndroidManifest.xml
- android/app/build/intermediates/merged_manifests/release/x86_64/AndroidManifest.xml
- android/app/build/intermediates/metadata_application_id/release/application-id.txt
- android/app/build/intermediates/packaged_manifests/release/output-metadata.json
- android/app/build/intermediates/packaged_manifests/release/arm64-v8a/AndroidManifest.xml
- android/app/build/intermediates/packaged_manifests/release/armeabi-v7a/AndroidManifest.xml
- android/app/build/intermediates/packaged_manifests/release/universal/AndroidManifest.xml
- android/app/build/intermediates/packaged_manifests/release/x86/AndroidManifest.xml
- android/app/build/intermediates/packaged_manifests/release/x86_64/AndroidManifest.xml
- android/app/build/intermediates/processed_res/release/out/output-metadata.json
- android/app/build/intermediates/symbol_list_with_package_name/release/package-aware-r.txt
- android/app/build/outputs/apk/release
- android/app/build/outputs/bundle/release
- android/app/build/outputs/logs/manifest-merger-release-report.txt
- android/app/src/debug/java/com/employeeselfservice/ReactNativeFlipper.java
- android/app/src/main/AndroidManifest.xml
- android/app/src/main/AndroidManifest.xml
- android/app/src/main/java/com/larona/employeeselfservice/MainActivity.java
- android/app/src/main/java/com/larona/employeeselfservice/MainApplication.java
- android/app/src/main/java/com/larona/employeeselfservice/newarchitecture/MainApplicationReactNativeHost.java
- android/app/src/main/java/com/larona/employeeselfservice/newarchitecture/components/MainComponentsRegistry.java
- android/app/src/main/java/com/larona/employeeselfservice/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java
- android/app/src/main/res/mipmap-hdpi
- android/app/src/main/res/mipmap-mdpi
- android/app/src/main/res/mipmap-xhdpi
- android/app/src/main/res/mipmap-xxhdpi
- android/app/src/main/res/mipmap-xxxhdpi
- android/app/src/main/res/value/strings.xml

<b><i>PRESS</i></b> folder <b>Android</b> di setting untuk <b>Debugging</b> Tidak bisa langsung di <b>Build APK</b>.

<b><i>PRESS-Build</i></b> folder <b>Android</b> di setting untuk <b>Build APK</b> tidak bisa langsung di <b>Debugging</b>.

Selama proses <b>RND</b> _(Research and Development)_ semua dikerjakan di folder <b><i>PRESS</i></b> supaya bisa jalan di Emulator secara Real-Time.

Setelah selesai tahap RND dan masuk ke proses <b>Build APK</b> pindahkan file-fle dibawah ini dari folder <b><i>PRESS</i></b> ke folder <b><i>PRESS-Build</i></b> :

- src
- node_modules
- App.js
- index.js
- package.json

<b>Build APK</b> menggunakian <i>Terminal</i>

- cd android
- ./gradlew --version
- ./gradlew clean
- ./gradlew assembleRelease or ./gradlew bundleRelease
