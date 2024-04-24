Var SystemDrive
!define MUI_FINISHPAGE_LINK "웹사이트 바로 가기 만들기"
!define MUI_FINISHPAGE_LINK_LOCATION "https://kkutu.plus" ; 여기에 원하는 웹사이트 주소 입력

!macro preInit
    ReadEnvStr $SystemDrive SYSTEMDRIVE
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\PlusPlatforms\KKuTu"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\PlusPlatforms\KKuTu"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\PlusPlatforms\KKuTu"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$SystemDrive\PlusPlatforms\KKuTu"
!macroend

Function .onInstSuccess
    CreateShortCut "$DESKTOP\플러스끄투 웹사이트.lnk" "${MUI_FINISHPAGE_LINK_LOCATION}" ; 바로 가기 파일 생성
FunctionEnd