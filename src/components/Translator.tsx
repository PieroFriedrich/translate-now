import { useState } from "react";
import { translateText } from "../api/openai";

const Translator = () => {
  const [text, setText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    if (inputLanguage === targetLanguage) {
      setError("Input language and target language cannot be the same.");
      return;
    }

    setError(null);
    setIsLoading(true);
    const result = await translateText(text, targetLanguage);
    setTranslatedText(result);
    setIsLoading(false);
  };

  const handleSpeak = () => {
    if (!translatedText) return;

    // Ensure the text is spoken with the correct language voice
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = getSpeechLang(targetLanguage);

    // Stop any ongoing speech before starting a new one
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  // Clear translated text when changing the target language
  const handleTargetLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTargetLanguage(e.target.value);
    setTranslatedText(""); // Clear previous translation
  };

  const getSpeechLang = (language: string) => {
    const langMap: { [key: string]: string } = {
      English: "en-US",
      Spanish: "es-ES",
      French: "fr-FR",
      German: "de-DE",
      Italian: "it-IT",
      Portuguese: "pt-BR",
      Chinese: "zh-CN",
      Japanese: "ja-JP",
      Korean: "ko-KR",
      Arabic: "ar-SA",
    };
    return langMap[language] || "en-US"; // Default to English
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-bold text-center">Find Translation</h1>

      <div className="space-y-2">
        <label htmlFor="input-language" className="block text-lg font-medium">
          Choose the Input Language:
        </label>
        <select
          id="input-language"
          className="w-full p-2 border rounded-lg"
          value={inputLanguage}
          onChange={(e) => setInputLanguage(e.target.value)}
        >
          <option>Arabic</option>
          <option>Chinese</option>
          <option>English</option>
          <option>French</option>
          <option>German</option>
          <option>Italian</option>
          <option>Japanese</option>
          <option>Korean</option>
          <option>Portuguese</option>
          <option>Spanish</option>
        </select>
      </div>

      <div className="space-y-2">
        <textarea
          className="w-full p-3 border rounded-lg"
          rows={4}
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="target-language" className="block text-lg font-medium">
          Choose the Target Language:
        </label>
        <select
          id="target-language"
          className="w-full p-2 border rounded-lg"
          value={targetLanguage}
          onChange={handleTargetLanguageChange} // Use the new function
        >
          <option>Arabic</option>
          <option>Chinese</option>
          <option>English</option>
          <option>French</option>
          <option>German</option>
          <option>Italian</option>
          <option>Japanese</option>
          <option>Korean</option>
          <option>Portuguese</option>
          <option>Spanish</option>
        </select>
      </div>

      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded-lg">{error}</div>
      )}

      <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg"
        onClick={handleTranslate}
        disabled={isLoading || inputLanguage === targetLanguage}
      >
        {isLoading ? "Translating..." : "Translate"}
      </button>

      {translatedText && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Translated Text:</h2>
          <p className="p-3 border rounded-lg bg-gray-100">{translatedText}</p>

          {/* Read Aloud Button */}
          <button
            className="w-full bg-green-500 text-white p-3 rounded-lg"
            onClick={handleSpeak}
          >
            Read Aloud
          </button>
        </div>
      )}
    </div>
  );
};

export default Translator;
