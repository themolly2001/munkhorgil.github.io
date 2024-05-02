import requests
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
#from ttkbootstrap import ttk
#from placeholder import EntryWithPlaceholder 

#Function to get weather information from OpenWeather API
def get_weather(city):
    api_key = "58be2d212c0e3498db2127363045453b"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=imperial"
    res = requests.get(url)

    if res.status_code == 404:
        messagebox.showerror("Error", "City Not Found")
        return None
    
    #Parse the response JSON to get weather info
    weather = res.json()
    icon_id = weather['weather'][0]['icon']
    temperature = weather['main']['temp']
    description = weather['weather'][0]['description']
    city = weather['name']
    country = weather['sys']['country']
   
    icon_url = f"https://openweathermap.org/img/wn/{icon_id}@2x.png"
    return (icon_url, temperature, description, city, country)


#Function to search weather for a city
def search():
    city = city_entry.get()
    result = get_weather(city)
    if result is None:
        return
    #if the city is found, unpack the weather info
    icon_url, temperature, description, city, country = result
    location_label.configure(text=f"{city}, {country}")

    print("Downloading icon image from URL:", icon_url)
    response = requests.get(icon_url, stream=True)
    if response.status_code == 200:
        print("Image downloaded successfully")
        #get weather icon image from the URL and update the icon label
        image = Image.open(requests.get(icon_url, stream=True).raw)
        icon = ImageTk.PhotoImage(image)
        icon_label.configure(image=icon)
        icon_label.image = icon
    else:
        print("Failed to download image, status code:", response.status_code)
     

    #update temperature and description labels
    temperature_label.configure(text=f"Temperature: {temperature}°F")
    description_label.configure(text=f"Description: {description}")
    
root = tk.Tk()
root.title("Weather App")
root.geometry("400x400")
#root.configure(background="#95C0FE")

city_entry = tk.Entry(root, font="Helvetica, 18")
city_entry.pack(pady=10)

search_button = tk.Button(root, text="Search",command=search)
search_button.pack(pady=10)

location_label = tk.Label(root, font="Helvetica, 18", borderwidth=0, highlightthickness=0)
location_label.pack(pady=20)

icon_label = tk.Label(root)
icon_label.pack()
icon_label.configure(background="#95C0FE")

temperature_label = tk.Label(root, font="Helvetica, 18")
temperature_label.pack()

description_label = tk.Label(root, font="Helvetica, 18")
description_label.pack()

root.mainloop()


# api_key = '58be2d212c0e3498db2127363045453b'

# user_input = input("Enter city: ")

# weather_data = requests.get( f"https://api.openweathermap.org/data/2.5/weather?q={user_input}&appid={api_key}&units=imperial")

# if weather_data.json()['cod'] == '404':
#     print(f"City Not Found")
# else:
#     weather = weather_data.json()['weather'][0]['main']
#     temp = round(weather_data.json()['main']['temp'])
#     print(f"The weather in {user_input}:", weather)

#     print(f"The temperature in {user_input} is: {temp}°F")