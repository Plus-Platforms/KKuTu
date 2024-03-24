using System.Collections;
using UnityEngine;
using UnityEngine.UI; 
public class SplashScript : MonoBehaviour
{
    public GameObject introScreen;
    public GameObject gracDisplay;
    public Button logoButton;

    // Start is called before the first frame update
    void Start()
    {
        // Logo 버튼을 비활성화합니다.
        logoButton.gameObject.SetActive(false);

        // 코루틴을 시작하여 Fade in 및 이동 애니메이션을 재생합니다.
        StartCoroutine(DisplaySplashAndIntro());
    }

    IEnumerator DisplaySplashAndIntro()
    {
        // gracDisplay를 활성화합니다.
        introScreen.SetActive(false);
        gracDisplay.SetActive(true);

        // 3초를 기다립니다.
        yield return new WaitForSeconds(2f);

        // gracDisplay를 비활성화합니다.
        gracDisplay.SetActive(false);

        yield return new WaitForSeconds(0.5f);

        // introScreen을 활성화합니다.
        introScreen.SetActive(true);
        // Logo 버튼의 초기 및 목표 위치를 설정합니다.
        Vector3 initialPosition = logoButton.transform.position;
        Vector3 targetPosition = new Vector3(initialPosition.x, initialPosition.y + 100f, initialPosition.z); // 위로 100 유닛 이동

        // Logo 버튼을 활성화합니다.
        logoButton.gameObject.SetActive(true);

        // Fade in 및 이동 애니메이션의 총 시간을 설정합니다.
        float duration = 0.5f; // Fade in에 걸리는 시간

        // Fade in 및 이동 애니메이션을 수행합니다.
        float elapsed = 0f;
        while (elapsed < duration)
        {
            // Ease-out 애니메이션을 계산합니다.
            float t = elapsed / duration;
            t = 1 - Mathf.Pow(1 - t, 2); // EaseOutQuad 함수를 대략적으로 구현한 것

            // Logo 버튼의 색상 투명도를 업데이트합니다.
            Color color = logoButton.image.color;
            color.a = t;
            logoButton.image.color = color;

            // Logo 버튼의 위치를 업데이트합니다.
            logoButton.transform.position = Vector3.Lerp(initialPosition, targetPosition, t);

            // 시간을 업데이트하고 다음 프레임까지 기다립니다.
            elapsed += Time.deltaTime;
            yield return null;
        }
    }
}
