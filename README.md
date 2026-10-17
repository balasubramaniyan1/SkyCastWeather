# SkyCast Weather App

A beginner-friendly React app for searching the current weather in a city. It uses Vite, React state, axios for API requests, and plain CSS.

## Set up the weather API key

1. Create a free account at [OpenWeatherMap](https://openweathermap.org/) and make an API key.
2. In this folder, create a file named `.env`.
3. Add your key to the file:

   ```text
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Stop and restart the development server after adding the key.

Do not commit your `.env` file. Vite exposes variables prefixed with `VITE_` to browser code, so use an API key intended for client-side use and configure restrictions in your OpenWeatherMap account if available.

## Run the app

```sh
npm install
npm run dev
```

Enter a city name and select **Search**. The app shows the current temperature, condition, feels-like temperature, humidity, and wind speed. It also displays a message if the city cannot be found, the API key is not accepted, or the request fails.
