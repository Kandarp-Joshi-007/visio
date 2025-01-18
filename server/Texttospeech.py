import requests

url = "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize"

payload = {
	"voice_code": "en-US-1",
	"text": "hello, what is your name?",
	"speed": "1.00",
	"pitch": "1.00",
	"output_type": "audio_url"
}
headers = {
	"content-type": "application/x-www-form-urlencoded",
	"X-RapidAPI-Key": "9cba138897msh481ce822836f5d3p13bec3jsn2e2892d18a2f",
	"X-RapidAPI-Host": "cloudlabs-text-to-speech.p.rapidapi.com"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())