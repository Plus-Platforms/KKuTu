using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonPressEffect : MonoBehaviour
{
    public AudioClip buttonClickSound;
    private AudioSource audioSource;
    public Button startBtn;
    // Start is called before the first frame update
    void Start()
    {
        // AudioSource 컴포넌트를 찾아 할당합니다.
        audioSource = GetComponent<AudioSource>();
        if (audioSource == null)
        {
            // AudioSource가 없다면 새로 추가합니다.
            audioSource = gameObject.AddComponent<AudioSource>();
        }

        startBtn.onClick.AddListener(OnButtonClick);
    }

    // 버튼 클릭 이벤트 핸들러
    public void OnButtonClick()
    {
        // 효과음을 재생합니다.
        if (buttonClickSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(buttonClickSound);
        }

        // 이후에 수행할 동작을 추가할 수 있습니다.
    }
}
