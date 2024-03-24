using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro; // Add this

public class LoadingScreen : MonoBehaviour
{
    public GameObject loadingScreen;
    public Image LoadingBar;
    public TextMeshProUGUI progressText; 
    public TextMeshProUGUI tipsText; 

    private string[] tips = {
        "TIP: 한방 단어로는 '이리듐'이 있어요.",
        "TIP: 수학 끝말잇기는 현재 테스트중인 모드예요.",
        "TIP: 플러스끄투에 접속하고 있어요."
    };
    public void LoadLevel(int sceneIndex)
    {
        ShowRandomTip();
        StartCoroutine(LoadAsynchronously(sceneIndex));
    }
    
    public void ShowRandomTip()
    {
        int randomIndex = Random.Range(0, tips.Length); // Select a random index
        string randomTip = tips[randomIndex]; // Get the tip at the random index

        tipsText.SetText(randomTip); // Set the text of the TextMeshProUGUI component
    }
    IEnumerator LoadAsynchronously(int sceneIndex)
    {
        AsyncOperation operation = SceneManager.LoadSceneAsync(sceneIndex);

        loadingScreen.SetActive(true);

        while (!operation.isDone)
        {
            float progress = Mathf.Clamp01(operation.progress / 0.9f);

            LoadingBar.fillAmount = progress;
            progressText.SetText(progress * 100f + "%"); // Change this

            yield return null;
        }
    }
}