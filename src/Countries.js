//This file contains a list of countries with known sanctions against gambling.

//The list below is where total sanctions against gambling are enacted.
//Online refers to online gambling
//Sports refers to sports betting
//Gambling refers to gambling in traditional casinos. Includes all forms.
const Countries = [
    {
        name: "Afghanistan",
        code: "AF",
        sanctioned: true,
        sanctions: ["Online","Sports","Gambling"]
    },
    {
        name: "North Korea",
        code: "KP",
        sanctioned: true,
        sanctions: ["Online","Sports","Gambling"]
    },
    {
        name: "Iran",
        code: "IR",
        sanctioned: true,
        sanctions: ["Online","Sports","Gambling"]
    },
    {
        name: "Syria",
        code: "SY",
        sanctioned: true,
        sanctions: ["Online","Sports","Gambling"]
    },
    {
        name: "Iraq",
        code: "IQ",
        sanctioned: true,
        sanctions: ["Online","Sports","Gambling"]
    },
    {
        name: "Israel",
        code: "IL",
        sanctioned: true,
        sanctions: ["Online","Sports","Gambling"]
    }
]

export default Countries;