using System.Collections;
using UnityEngine;

public class SplashScript : MonoBehaviour
{
    public GameObject introScreen;

    // Start is called before the first frame update
    void Start()
    {
        introScreen.SetActive(true);
    }

    // Update is called once per frame
    void Update()
    {
        StartCoroutine(FadeOut(introScreen, 3.0f));
    }

    IEnumerator FadeOut(GameObject panel, float duration)
    {
        CanvasGroup canvasGroup = panel.GetComponent<CanvasGroup>();
        if (canvasGroup == null)
        {
            yield break;
        }

        for (float t = 0.0f; t < duration; t += Time.deltaTime)
        {
            canvasGroup.alpha = Mathf.Lerp(1, 0, t / duration);
            yield return null;
        }
        canvasGroup.alpha = 0;
        panel.SetActive(false); // Set the panel to inactive after the fade out
    }
}
