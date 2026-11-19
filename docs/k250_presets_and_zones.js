// Auto-extracted Kurzweil K250 256-Preset, 675-Sample Zone Tables & Voice Engines
function hasK250Sample(k) { return Boolean((window.decodedBuffers && window.decodedBuffers[k]) || (window.K250_MANIFEST && window.K250_MANIFEST[k] !== undefined)); }
const K250_PRESETS = [
      {
            "id": 1,
            "name": "001: STEINWAY CONCERT GRAND",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 7.2,
            "cut": 17000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 2,
            "name": "002: CONCERT STUDIO GRAND",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 3.0,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 3,
            "name": "003: DARK CLASSICAL GRAND",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 8500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 4,
            "name": "004: BRIGHT POP GRAND",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 18000,
            "filt": "lowpass",
            "res": 1.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 5,
            "name": "005: WARM PARLOR PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 7200,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 6,
            "name": "006: HONKY-TONK RAGTIME",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 2.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 12,
            "vibR": 0,
            "vibD": 0,
            "layer": "piano_c4",
            "layerVol": 0.75,
            "layerDet": -14
      },
      {
            "id": 7,
            "name": "007: UPRIGHT SALOON PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 2.0,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 7,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 8,
            "name": "008: TACK PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 1.6,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 9,
            "name": "009: DETUNED SALOON UPRIGHT",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 2.4,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": -16,
            "vibR": 0,
            "vibD": 0,
            "layer": "piano_c3",
            "layerVol": 0.8,
            "layerDet": 16
      },
      {
            "id": 10,
            "name": "010: GRAND PIANO & STRINGS LAYER",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.65,
            "layerDet": 3
      },
      {
            "id": 11,
            "name": "011: PIANO & CHOIR LAYER",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.6,
            "layerDet": 0
      },
      {
            "id": 12,
            "name": "012: HARPSICHORD 8-FOOT",
            "category": "Acoustic Pianos & Keys",
            "type": "harpsichord",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 13,
            "name": "013: HARPSICHORD COUPLED 8+4",
            "category": "Acoustic Pianos & Keys",
            "type": "harpsichord",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.7,
            "layerDet": 1200
      },
      {
            "id": 14,
            "name": "014: LUTE HARPSICHORD",
            "category": "Acoustic Pianos & Keys",
            "type": "harpsichord",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 15,
            "name": "015: FRENCH CLAVICHORD",
            "category": "Acoustic Pianos & Keys",
            "type": "harpsichord",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 4.5,
            "vibD": 15,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 16,
            "name": "016: CELESTA CONCERT BELLS",
            "category": "Acoustic Pianos & Keys",
            "type": "mallet",
            "oct": 1,
            "att": 0.003,
            "dec": 2.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 17,
            "name": "017: CONCERT TOY PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 1,
            "att": 0.002,
            "dec": 1.2,
            "cut": 12000,
            "filt": "lowpass",
            "res": 3.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 18,
            "name": "018: MUSIC BOX ANTIQUE",
            "category": "Acoustic Pianos & Keys",
            "type": "mallet",
            "oct": 2,
            "att": 0.003,
            "dec": 2.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 19,
            "name": "019: OCTAVE GRAND PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 3.4,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "piano_c5",
            "layerVol": 0.6,
            "layerDet": 1200
      },
      {
            "id": 20,
            "name": "020: SOFT ROMANTIC PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.02,
            "dec": 3.6,
            "cut": 6200,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 21,
            "name": "021: CONCERT HALL GRAND (WET)",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.4,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 22,
            "name": "022: DYNAMIC VELOCITY PIANO",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 13500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 23,
            "name": "023: PIANO SUSTAINED RESONANCE",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 5.2,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 24,
            "name": "024: PREPARED PIANO STABS",
            "category": "Acoustic Pianos & Keys",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 0.9,
            "cut": 11000,
            "filt": "lowpass",
            "res": 2.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 25,
            "name": "025: CP-70 ELECTRIC GRAND",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 26,
            "name": "026: RHODES STAGE 73 CLASSIC",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.5,
            "cut": 9500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 27,
            "name": "027: RHODES SUITCASE CHORUS",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 9,
            "vibR": 0,
            "vibD": 0,
            "layer": "ep_c3",
            "layerVol": 0.7,
            "layerDet": -9
      },
      {
            "id": 28,
            "name": "028: DYNO-MY-RHODES BRIGHT",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 29,
            "name": "029: WARM VINTAGE EP",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.0,
            "cut": 6800,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 30,
            "name": "030: WURLITZER 200A",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 2.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.6,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 31,
            "name": "031: WURLI TREMOLO VIBE",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 10500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.5,
            "vibD": 22,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 32,
            "name": "032: DX7 FM RHODES 1",
            "category": "Electric Pianos & Tines",
            "type": "fm",
            "oct": 0,
            "att": 0.005,
            "dec": 2.6,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 33,
            "name": "033: DX7 FM DIGITAL EP 2",
            "category": "Electric Pianos & Tines",
            "type": "fm",
            "oct": 0,
            "att": 0.005,
            "dec": 3.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "ep_c5",
            "layerVol": 0.5,
            "layerDet": 0
      },
      {
            "id": 34,
            "name": "034: TINE BELL ELECTRIC PIANO",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "orch_timpani",
            "layerVol": 0.4,
            "layerDet": 2400
      },
      {
            "id": 35,
            "name": "035: HYBRID GRAND + RHODES",
            "category": "Electric Pianos & Tines",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 3.6,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "ep_c3",
            "layerVol": 0.7,
            "layerDet": 4
      },
      {
            "id": 36,
            "name": "036: FUNKY CLAVINET D6",
            "category": "Electric Pianos & Tines",
            "type": "clav",
            "oct": 0,
            "att": 0.002,
            "dec": 1.4,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 37,
            "name": "037: CLAVINET WAH / FILTER",
            "category": "Electric Pianos & Tines",
            "type": "clav",
            "oct": 0,
            "att": 0.002,
            "dec": 1.3,
            "cut": 4500,
            "filt": "lowpass",
            "res": 4.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 38,
            "name": "038: MUTED CLAVINET PLUCK",
            "category": "Electric Pianos & Tines",
            "type": "clav",
            "oct": 0,
            "att": 0.001,
            "dec": 0.6,
            "cut": 8000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 39,
            "name": "039: OCTAVE FUNK CLAV",
            "category": "Electric Pianos & Tines",
            "type": "clav",
            "oct": 0,
            "att": 0.002,
            "dec": 1.4,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.65,
            "layerDet": 1200
      },
      {
            "id": 40,
            "name": "040: PHASE CLAVINET 70S",
            "category": "Electric Pianos & Tines",
            "type": "clav",
            "oct": 0,
            "att": 0.005,
            "dec": 1.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 12,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.8,
            "layerDet": -12
      },
      {
            "id": 41,
            "name": "041: BELL CLAVINET",
            "category": "Electric Pianos & Tines",
            "type": "clav",
            "oct": 0,
            "att": 0.005,
            "dec": 1.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "ep_c5",
            "layerVol": 0.5,
            "layerDet": 0
      },
      {
            "id": 42,
            "name": "042: SPACE TINES ETHEREAL",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.5,
            "layerDet": 7
      },
      {
            "id": 43,
            "name": "043: LOFI CASSETTE EP",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 44,
            "name": "044: VINTAGE TREMOLO SUITCASE",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.4,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 6.0,
            "vibD": 26,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 45,
            "name": "045: CRYSTAL EP PAD",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.55,
            "layerDet": 0
      },
      {
            "id": 46,
            "name": "046: AMBIENT ELECTRIC GRAND",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 4.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 47,
            "name": "047: 80S POWER BALLAD EP",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.6,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 10,
            "vibR": 0,
            "vibD": 0,
            "layer": "ep_c5",
            "layerVol": 0.7,
            "layerDet": -10
      },
      {
            "id": 48,
            "name": "048: DARK TINES NIGHT",
            "category": "Electric Pianos & Tines",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 5500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 49,
            "name": "049: HAMMOND B3 FAST LESLIE",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 4.0,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 6.8,
            "vibD": 35,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 50,
            "name": "050: HAMMOND B3 SLOW CHORALE",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 13000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 1.2,
            "vibD": 14,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 51,
            "name": "051: JIMMY SMITH JAZZ ORGAN",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.0,
            "cut": 11000,
            "filt": "lowpass",
            "res": 2.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 52,
            "name": "052: GOSPEL B3 FULL DRAWBARS",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "b3_c5",
            "layerVol": 0.75,
            "layerDet": 1200
      },
      {
            "id": 53,
            "name": "053: ROCK 888000000 ORGAN",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.8,
            "cut": 9500,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 54,
            "name": "054: PERCUSSIVE 2ND HARMONIC B3",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.6,
            "layerDet": 1200
      },
      {
            "id": 55,
            "name": "055: PERCUSSIVE 3RD HARMONIC B3",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.6,
            "layerDet": 1900
      },
      {
            "id": 56,
            "name": "056: MELLOW BALLAD B3",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 6500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 57,
            "name": "057: FARFISA COMPACT TRANSISTOR",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.2,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 58,
            "name": "058: VOX CONTINENTAL 60S",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.5,
            "cut": 14000,
            "filt": "lowpass",
            "res": 2.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 59,
            "name": "059: PIPE ORGAN PRINCIPAL 8'",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.03,
            "dec": 4.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 60,
            "name": "060: CHURCH ORGAN GREAT TUTTI",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.04,
            "dec": 5.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.6,
            "layerDet": 1200
      },
      {
            "id": 61,
            "name": "061: CATHEDRAL FULL MIXTURE",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 5.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "b3_c5",
            "layerVol": 0.8,
            "layerDet": 1200
      },
      {
            "id": 62,
            "name": "062: PIPE ORGAN FLUTE 4'",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 1,
            "att": 0.005,
            "dec": 4.0,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 63,
            "name": "063: BAROQUE POSITIV ORGAN",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.02,
            "dec": 3.2,
            "cut": 13000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 64,
            "name": "064: REED PUMP ORGAN",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.8,
            "cut": 8500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 4.0,
            "vibD": 18,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 65,
            "name": "065: FRENCH MUSETTE ACCORDION",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 16,
            "vibR": 0,
            "vibD": 0,
            "layer": "b3_g3",
            "layerVol": 0.85,
            "layerDet": -16
      },
      {
            "id": 66,
            "name": "066: TANGO BANDONEON",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.01,
            "dec": 2.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 2.2,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 67,
            "name": "067: BLUES HARMONICA",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 2.2,
            "cut": 9000,
            "filt": "lowpass",
            "res": 3.2,
            "det": 0,
            "vibR": 5.2,
            "vibD": 28,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 68,
            "name": "068: THEATER ORGAN VOX HUMANA",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.0,
            "vibD": 20,
            "layer": "choir_pad",
            "layerVol": 0.65,
            "layerDet": 0
      },
      {
            "id": 69,
            "name": "069: CATHEDRAL PEDALS 16'+32'",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": -1,
            "att": 0.005,
            "dec": 5.0,
            "cut": 3500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 70,
            "name": "070: ROTARY ROCK LEAD ORGAN",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.6,
            "cut": 15000,
            "filt": "lowpass",
            "res": 3.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 71,
            "name": "071: GOTHIC DARK CATHEDRAL",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 5.5,
            "cut": 5500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.6,
            "layerDet": 0
      },
      {
            "id": 72,
            "name": "072: CELESTIAL ORGAN PAD",
            "category": "Tonewheel & Church Organs",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 5.5,
            "cut": 10000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 73,
            "name": "073: SYMPHONIC GRAND STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.06,
            "dec": 4.5,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 74,
            "name": "074: FULL SYMPHONIC STRING SECTION",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.08,
            "dec": 4.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.7,
            "layerDet": 8
      },
      {
            "id": 75,
            "name": "075: CHAMBER STRINGS (SMALL)",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.04,
            "dec": 3.8,
            "cut": 13000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 76,
            "name": "076: WARM LEGATO VIOLINS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.09,
            "dec": 4.2,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 77,
            "name": "077: EXPRESSIVE SOLO VIOLIN",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.04,
            "dec": 3.5,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.5,
            "vibD": 25,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 78,
            "name": "078: WARM ROMANTIC CELLO",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": -1,
            "att": 0.05,
            "dec": 4.0,
            "cut": 8500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 4.8,
            "vibD": 20,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 79,
            "name": "079: SOLO VIOLA D'AMORE",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.05,
            "dec": 3.8,
            "cut": 10000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.0,
            "vibD": 22,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 80,
            "name": "080: DEEP ORCHESTRAL CONTRABASS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": -2,
            "att": 0.07,
            "dec": 4.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 81,
            "name": "081: PIZZICATO STRING SECTION",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.002,
            "dec": 0.9,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.65,
            "layerDet": 0
      },
      {
            "id": 82,
            "name": "082: MARCATO STRINGS STACCATO",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.015,
            "dec": 1.4,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 83,
            "name": "083: TREMOLO SUSPENSE STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 3.5,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 9.0,
            "vibD": 38,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 84,
            "name": "084: OCTAVE SYMPHONIC STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.6,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.75,
            "layerDet": 1200
      },
      {
            "id": 85,
            "name": "085: SFORZANDO STRING SWELL",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.25,
            "dec": 4.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 86,
            "name": "086: SLOW BAROQUE ADAGIO STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.35,
            "dec": 5.5,
            "cut": 9500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 87,
            "name": "087: ORCHESTRAL CONCERT HARP",
            "category": "Orchestral Strings & Ensembles",
            "type": "clav",
            "oct": 0,
            "att": 0.003,
            "dec": 2.5,
            "cut": 13000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 88,
            "name": "088: HARP GLISSANDO / ARP",
            "category": "Orchestral Strings & Ensembles",
            "type": "clav",
            "oct": 0,
            "att": 0.002,
            "dec": 2.8,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.6,
            "layerDet": 1200
      },
      {
            "id": 89,
            "name": "089: CELTIC FOLK HARP",
            "category": "Orchestral Strings & Ensembles",
            "type": "clav",
            "oct": 0,
            "att": 0.003,
            "dec": 2.2,
            "cut": 10500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 90,
            "name": "090: STRINGS & WOODWINDS BLEND",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.5,
            "layerDet": 1200
      },
      {
            "id": 91,
            "name": "091: STRINGS & FRENCH HORN LAYER",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.65,
            "layerDet": 0
      },
      {
            "id": 92,
            "name": "092: DARK CELLOS & BASSES",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": -1,
            "att": 0.005,
            "dec": 4.5,
            "cut": 5500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 93,
            "name": "093: HIGH VIOLINS OCTAVES",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 1,
            "att": 0.005,
            "dec": 4.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 94,
            "name": "094: SPICCATO SHORT STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 0.7,
            "cut": 16000,
            "filt": "lowpass",
            "res": 2.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 95,
            "name": "095: CINEMATIC TENSION STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.8,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 15,
            "vibR": 7.5,
            "vibD": 30,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 96,
            "name": "096: PASTORAL CHAMBER QUARTET",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.05,
            "dec": 3.8,
            "cut": 11500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 97,
            "name": "097: VINTAGE MELLOTRON STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 3.6,
            "cut": 8000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 10,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.7,
            "layerDet": -10
      },
      {
            "id": 98,
            "name": "098: SYNTHESIZER STRING MACHINE",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 14,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.8,
            "layerDet": -14
      },
      {
            "id": 99,
            "name": "099: SOLINA STRING ENSEMBLE",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 6.0,
            "vibD": 24,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 100,
            "name": "100: K250 HYBRID ANALOG STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 4.6,
            "cut": 13500,
            "filt": "lowpass",
            "res": 2.2,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 101,
            "name": "101: AMBIENT ETHEREAL STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.4,
            "dec": 5.8,
            "cut": 9000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.6,
            "layerDet": 0
      },
      {
            "id": 102,
            "name": "102: EPIC FILM SCORE STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.1,
            "dec": 5.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 103,
            "name": "103: HOLLYWOOD ROMANTIC STRINGS",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.12,
            "dec": 5.2,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 8,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 104,
            "name": "104: GRAND PHILHARMONIC TUTTI",
            "category": "Orchestral Strings & Ensembles",
            "type": "strings",
            "oct": 0,
            "att": 0.1,
            "dec": 5.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "piano_c4",
            "layerVol": 0.75,
            "layerDet": 0
      },
      {
            "id": 105,
            "name": "105: FRENCH HORN SECTION",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.012,
            "dec": 4.2,
            "cut": 14500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 106,
            "name": "106: SOLO FRENCH HORN",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.03,
            "dec": 3.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 4.5,
            "vibD": 18,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 107,
            "name": "107: CONCERT ORCHESTRAL TRUMPET",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 1,
            "att": 0.006,
            "dec": 3.0,
            "cut": 9800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 108,
            "name": "108: HARMON MUTED TRUMPET (MILES)",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 1,
            "att": 0.008,
            "dec": 2.4,
            "cut": 7800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 109,
            "name": "109: CUP MUTED TRUMPET",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 1,
            "att": 0.006,
            "dec": 2.5,
            "cut": 9800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 110,
            "name": "110: TENOR TROMBONE",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.006,
            "dec": 3.2,
            "cut": 11500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 111,
            "name": "111: BASS TROMBONE SFORZANDO",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": -1,
            "att": 0.006,
            "dec": 3.6,
            "cut": 11500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 112,
            "name": "112: TUBA & LOW BRASS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.012,
            "dec": 4.2,
            "cut": 6500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 113,
            "name": "113: ORCHESTRAL BRASS FANFARE",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.006,
            "dec": 3.8,
            "cut": 9800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_d4",
            "layerVol": 0.8,
            "layerDet": 1200
      },
      {
            "id": 114,
            "name": "114: BIG BAND HORN SECTION",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.01,
            "dec": 2.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 115,
            "name": "115: TOWER OF POWER TIGHT BRASS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 1.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 2.2,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 116,
            "name": "116: BRIGHT POP BRASS STABS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 1.4,
            "cut": 18000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 117,
            "name": "117: SFORZANDO BRASS FALL",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.15,
            "dec": 3.2,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 118,
            "name": "118: DYNO BRASS STABS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 1.6,
            "cut": 15000,
            "filt": "lowpass",
            "res": 3.2,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 119,
            "name": "119: 80S SYNTH BRASS 1",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.02,
            "dec": 3.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 12,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.75,
            "layerDet": -12
      },
      {
            "id": 120,
            "name": "120: 80S OBERHEIM SYNTH BRASS 2",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.025,
            "dec": 3.4,
            "cut": 13500,
            "filt": "lowpass",
            "res": 2.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 121,
            "name": "121: CS-80 BRASS LEAD",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.04,
            "dec": 4.0,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.0,
            "vibD": 22,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 122,
            "name": "122: BRASS & WOODWIND TUTTI",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_d4",
            "layerVol": 0.7,
            "layerDet": 700
      },
      {
            "id": 123,
            "name": "123: MUTED BRASS SECTION",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 2.6,
            "cut": 5500,
            "filt": "lowpass",
            "res": 3.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 124,
            "name": "124: WAGNERIAN HORN CALL",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.06,
            "dec": 4.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 125,
            "name": "125: BAROQUE TRUMPET CLARION",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 1,
            "att": 0.006,
            "dec": 2.8,
            "cut": 9800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 126,
            "name": "126: FLUGELHORN MELLOW",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.02,
            "dec": 3.2,
            "cut": 8500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 127,
            "name": "127: CORNET BRASS BAND",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 1,
            "att": 0.005,
            "dec": 3.0,
            "cut": 14000,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 128,
            "name": "128: EUPHONIUM WARM",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.014,
            "dec": 3.8,
            "cut": 7800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 129,
            "name": "129: DIXIE HORNS RAGTIME",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.01,
            "dec": 2.2,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 130,
            "name": "130: SALSA HORN HITS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 1.2,
            "cut": 17000,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 131,
            "name": "131: EPIC HOLLYWOOD BRASS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.04,
            "dec": 4.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.65,
            "layerDet": 0
      },
      {
            "id": 132,
            "name": "132: BRASS SWELL & CRESCENDO",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.35,
            "dec": 4.5,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 133,
            "name": "133: LOW BRASS DRONE",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": -1,
            "att": 0.005,
            "dec": 5.0,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 134,
            "name": "134: VINTAGE ANALOG BRASS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.005,
            "dec": 3.5,
            "cut": 10500,
            "filt": "lowpass",
            "res": 3.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 135,
            "name": "135: JUMP SYNTH BRASS HIT",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 0,
            "att": 0.01,
            "dec": 2.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 136,
            "name": "136: ROYAL FANFARE TRUMPETS",
            "category": "Orchestral & Commercial Brass",
            "type": "horns",
            "oct": 1,
            "att": 0.006,
            "dec": 3.6,
            "cut": 9800,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_d4",
            "layerVol": 0.8,
            "layerDet": 1200
      },
      {
            "id": 137,
            "name": "137: CONCERT SILVER FLUTE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.01,
            "dec": 4.4,
            "cut": 12500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 138,
            "name": "138: LEGATO ORCHESTRAL PICCOLO",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.01,
            "dec": 4.4,
            "cut": 12500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 139,
            "name": "139: PASTORAL OBOE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 3.5,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 140,
            "name": "140: ENGLISH HORN (COR ANGLAIS)",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 3.2,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 141,
            "name": "141: CONCERT CLARINET B-FLAT",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.008,
            "dec": 4.4,
            "cut": 9500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 142,
            "name": "142: BASS CLARINET DEEP",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": -1,
            "att": 0.008,
            "dec": 4.4,
            "cut": 9500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 143,
            "name": "143: ORCHESTRAL BASSOON",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": -1,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 3.8,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 144,
            "name": "144: CONTRABASSOON LOW",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": -2,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 3.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 145,
            "name": "145: WOODWIND ENSEMBLE QUINTET",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": "strings_swell",
            "layerVol": 0.5,
            "layerDet": 0
      },
      {
            "id": 146,
            "name": "146: PAN FLUTE ANDEAN",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 147,
            "name": "147: SHAKUHACHI BAMBOO FLUTE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 4.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 148,
            "name": "148: RECORDER RENAISSANCE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 149,
            "name": "149: WHISTLE / PICCOLO LEAD",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 2,
            "att": 0.025,
            "dec": 4.4,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 150,
            "name": "150: SOPRANO SAXOPHONE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.008,
            "dec": 1.8,
            "cut": 10500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 151,
            "name": "151: ALTO SAX SMOOTH",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.008,
            "dec": 1.8,
            "cut": 10500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 152,
            "name": "152: TENOR SAX BREATHY (JAZZ)",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.008,
            "dec": 1.8,
            "cut": 10500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 153,
            "name": "153: BARITONE SAX GROWL",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": -1,
            "att": 0.008,
            "dec": 1.8,
            "cut": 10500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 154,
            "name": "154: SAX ENSEMBLE SECTION",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.008,
            "dec": 1.8,
            "cut": 10500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.7,
            "layerDet": 12
      },
      {
            "id": 155,
            "name": "155: CLARINET & FLUTE DUET",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.01,
            "dec": 1.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.45,
            "layerDet": 0
      },
      {
            "id": 156,
            "name": "156: OBOE & ENGLISH HORN DUET",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.025,
            "dec": 1.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 3.5,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 157,
            "name": "157: CELTIC TIN WHISTLE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 2,
            "att": 0.025,
            "dec": 1.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 158,
            "name": "158: ANDEAN QUENA FLUTE",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.025,
            "dec": 1.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 159,
            "name": "159: BAGPIPES DRONE & CHANTER",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 0,
            "att": 0.025,
            "dec": 1.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 4.2,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": "b3_g3",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 160,
            "name": "160: OCARINA SWEET WOODS",
            "category": "Woodwinds & Reeds",
            "type": "winds",
            "oct": 1,
            "att": 0.025,
            "dec": 1.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.2,
            "vibD": 6.0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 161,
            "name": "161: SYMPHONIC CLASSICAL CHOIR",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.08,
            "dec": 4.5,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 162,
            "name": "162: BOYS CHOIR SOPRANOS",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 1,
            "att": 0.06,
            "dec": 4.2,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 163,
            "name": "163: MIXED CHOIR AAHS",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.1,
            "dec": 4.8,
            "cut": 13000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.7,
            "layerDet": 8
      },
      {
            "id": 164,
            "name": "164: CATHEDRAL CHOIR OOHS",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.15,
            "dec": 5.0,
            "cut": 6500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 165,
            "name": "165: GREGORIAN CHANT MONKS",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": -1,
            "att": 0.12,
            "dec": 5.2,
            "cut": 5500,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 166,
            "name": "166: POP VOCAL PAD",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.05,
            "dec": 4.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 10,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 167,
            "name": "167: FEMALE SOLO SOPRANO",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 1,
            "att": 0.04,
            "dec": 3.8,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.5,
            "vibD": 25,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 168,
            "name": "168: TENOR SOLO OPERA",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.04,
            "dec": 3.6,
            "cut": 9000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.0,
            "vibD": 22,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 169,
            "name": "169: DOO-BOP JAZZ SCAT",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 1.2,
            "cut": 12000,
            "filt": "lowpass",
            "res": 3.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 170,
            "name": "170: FAIRLIGHT 'SARAH' VOX",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.03,
            "dec": 3.5,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 171,
            "name": "171: VODER FORMANT SPEECH",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 3500,
            "filt": "lowpass",
            "res": 2.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 172,
            "name": "172: MELLOTRON CHOIR 8-VOICE",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 8500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 14,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.8,
            "layerDet": -14
      },
      {
            "id": 173,
            "name": "173: ETHEREAL ANGELIC VOICES",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.35,
            "dec": 5.8,
            "cut": 11000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.6,
            "layerDet": 0
      },
      {
            "id": 174,
            "name": "174: CYBERPUNK VOCALOID",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 3.0,
            "cut": 13000,
            "filt": "lowpass",
            "res": 4.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 175,
            "name": "175: SPACE CHOIR SWELL",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.45,
            "dec": 6.0,
            "cut": 9000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 176,
            "name": "176: VELVET VOCAL WASH",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.25,
            "dec": 5.5,
            "cut": 7500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 177,
            "name": "177: SYNTH VOICE PAD",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 12,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.55,
            "layerDet": 0
      },
      {
            "id": 178,
            "name": "178: AMBIENT SHIMMER CHOIR",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 1,
            "att": 0.3,
            "dec": 6.0,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 179,
            "name": "179: DARK CATHEDRAL CHANT",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": -1,
            "att": 0.2,
            "dec": 5.5,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 180,
            "name": "180: TIBETAN MONKS RESONANCE",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": -1,
            "att": 0.005,
            "dec": 6.0,
            "cut": 3800,
            "filt": "lowpass",
            "res": 3.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 181,
            "name": "181: VOCAL SWEEP FILTER",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 6500,
            "filt": "lowpass",
            "res": 3.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 182,
            "name": "182: GOSPEL PRAISE CHOIR",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "b3_g3",
            "layerVol": 0.5,
            "layerDet": 0
      },
      {
            "id": 183,
            "name": "183: CHOIR & STRINGS ADAGIO",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 0,
            "att": 0.2,
            "dec": 5.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.75,
            "layerDet": 0
      },
      {
            "id": 184,
            "name": "184: CELESTIAL VOICE ASCENT",
            "category": "Choirs, Vocals & Pads",
            "type": "choir",
            "oct": 1,
            "att": 0.3,
            "dec": 6.2,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 185,
            "name": "185: CLASSICAL NYLON GUITAR",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 186,
            "name": "186: ACOUSTIC STEEL STRING 6-STRING",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 187,
            "name": "187: 12-STRING ACOUSTIC CHIME",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 12,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.7,
            "layerDet": 1200
      },
      {
            "id": 188,
            "name": "188: CLEAN STRATOCASTER NECK",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 2.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 189,
            "name": "189: JAZZ ARCHTOP HOLLOWBODY",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.008,
            "dec": 4.0,
            "cut": 5200,
            "filt": "lowpass",
            "res": 0.72,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 190,
            "name": "190: FUNK MUTED GUITAR PLUCKS",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 191,
            "name": "191: OVERDRIVEN LEAD GUITAR",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 4.5,
            "det": 0,
            "vibR": 5.5,
            "vibD": 35,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 192,
            "name": "192: DISTORTED POWER CHORDS",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": -1,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 4.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 193,
            "name": "193: 12-STRING RICKENBACKER",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 0,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 8,
            "vibR": 0,
            "vibD": 0,
            "layer": "clav_f3",
            "layerVol": 0.75,
            "layerDet": 1200
      },
      {
            "id": 194,
            "name": "194: ACOUSTIC GUITAR HARMONICS",
            "category": "Guitars & Basses",
            "type": "guitar",
            "oct": 1,
            "att": 0.003,
            "dec": 2.8,
            "cut": 12500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 195,
            "name": "195: K250 ACOUSTIC UPRIGHT BASS",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -2,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 196,
            "name": "196: FENDER PRECISION BASS FINGER",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 197,
            "name": "197: FENDER JAZZ BASS PICKED",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 198,
            "name": "198: JACO FRETLESS BASS MWAH",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 5.0,
            "vibD": 22,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 199,
            "name": "199: MARCUS MILLER SLAP BASS",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 3.2,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 200,
            "name": "200: POP SLAP & POP THUMB",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 201,
            "name": "201: ACOUSTIC BASS & RIDE CYMBAL",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -2,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "drum_cymbal",
            "layerVol": 0.45,
            "layerDet": 0
      },
      {
            "id": 202,
            "name": "202: MINIMOOG ANALOG SUB BASS",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 1.5,
            "cut": 3500,
            "filt": "lowpass",
            "res": 3.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 203,
            "name": "203: TB-303 ACID RESO BASS",
            "category": "Guitars & Basses",
            "type": "303",
            "oct": -1,
            "att": 0.005,
            "dec": 1.8,
            "cut": 3500,
            "filt": "lowpass",
            "res": 5.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 204,
            "name": "204: FM SOLID BASS (LATELYBASS)",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 1.5,
            "cut": 3500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 205,
            "name": "205: 808 SUB BOOM BASS",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -2,
            "att": 0.005,
            "dec": 3.2,
            "cut": 1500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 206,
            "name": "206: STICK / WARR BASS",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 207,
            "name": "207: SYNTH WAVE BASS",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -1,
            "att": 0.005,
            "dec": 1.5,
            "cut": 3500,
            "filt": "lowpass",
            "res": 2.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 208,
            "name": "208: ACOUSTIC BASS SOLO PIZZ",
            "category": "Guitars & Basses",
            "type": "bass",
            "oct": -2,
            "att": 0.005,
            "dec": 2.2,
            "cut": 4500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 209,
            "name": "209: CONCERT TIMPANI ROLLS & HITS",
            "category": "Tuned Mallets & Percussion",
            "type": "timpani",
            "oct": 0,
            "att": 0.005,
            "dec": 3.5,
            "cut": 8000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 210,
            "name": "210: ORCHESTRAL GONG (TAM-TAM)",
            "category": "Tuned Mallets & Percussion",
            "type": "timpani",
            "oct": -1,
            "att": 0.005,
            "dec": 5.5,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 211,
            "name": "211: TUBULAR CHURCH CHIMES",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 1,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "orch_timpani",
            "layerVol": 0.6,
            "layerDet": 1200
      },
      {
            "id": 212,
            "name": "212: CONCERT MARIMBA ROSEWOOD",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 213,
            "name": "213: VIBRAPHONE MOTOR TREMOLO",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 0,
            "att": 0.004,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 214,
            "name": "214: ORCHESTRAL XYLOPHONE",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 1,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 215,
            "name": "215: CONCERT GLOCKENSPIEL",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 2,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 216,
            "name": "216: ORCHESTRAL CROTALES",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 2,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 217,
            "name": "217: BALAFON AFRICAN MALLET",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 2.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 218,
            "name": "218: STEEL DRUM / STEEL PAN",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 3.5,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 219,
            "name": "219: INDONESIAN GAMELAN GONG",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "orch_gong",
            "layerVol": 0.7,
            "layerDet": 700
      },
      {
            "id": 220,
            "name": "220: KALIMBA THUMB PIANO",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 1,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 221,
            "name": "221: ORCHESTRAL BASS DRUM (GRAN CASSA)",
            "category": "Tuned Mallets & Percussion",
            "type": "drums",
            "oct": 0,
            "att": 0.004,
            "dec": 3.6,
            "cut": 3600,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 222,
            "name": "222: CONCERT SNARE ROLL (FIELD DRUM)",
            "category": "Tuned Mallets & Percussion",
            "type": "drums",
            "oct": 0,
            "att": 0.004,
            "dec": 1.6,
            "cut": 13500,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 223,
            "name": "223: PIATTI CRASH CYMBALS",
            "category": "Tuned Mallets & Percussion",
            "type": "drums",
            "oct": 0,
            "att": 0.004,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 0.7,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 224,
            "name": "224: CASTANETS & SPANISH WOOD",
            "category": "Tuned Mallets & Percussion",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 0.6,
            "cut": 12000,
            "filt": "lowpass",
            "res": 3.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 225,
            "name": "225: ORCHESTRAL TAMBOURINE",
            "category": "Tuned Mallets & Percussion",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 1.4,
            "cut": 15000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 226,
            "name": "226: CONCERT TRIANGLE",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 2,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 227,
            "name": "227: SLEIGH BELLS CHRISTMAS",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 1,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 228,
            "name": "228: WIND CHIMES TREE",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 2,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 229,
            "name": "229: TIMPANI & BRASS HIT",
            "category": "Tuned Mallets & Percussion",
            "type": "timpani",
            "oct": 0,
            "att": 0.005,
            "dec": 3.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 230,
            "name": "230: TUBULAR BELLS FANFARE",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 1,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_d4",
            "layerVol": 0.6,
            "layerDet": 0
      },
      {
            "id": 231,
            "name": "231: MARIMBA & VIBES DUET",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": 0,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "orch_timpani",
            "layerVol": 0.6,
            "layerDet": 1200
      },
      {
            "id": 232,
            "name": "232: BIG CINEMATIC IMPACT",
            "category": "Tuned Mallets & Percussion",
            "type": "mallet",
            "oct": -1,
            "att": 0.002,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "orch_gong",
            "layerVol": 0.8,
            "layerDet": 0
      },
      {
            "id": 233,
            "name": "233: WEST ROOM ACOUSTIC DRUM KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 3.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 234,
            "name": "234: STUDIO TIGHT POP KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 2.0,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 235,
            "name": "235: ROCK POWER ARENA DRUMS",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 3.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 236,
            "name": "236: JAZZ BRUSH KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 2.2,
            "cut": 9000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 237,
            "name": "237: 80S GATED REVERB SNARE KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 2.8,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 238,
            "name": "238: TR-808 CLASSIC ELECTRO KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 3.5,
            "cut": 14000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 239,
            "name": "239: TR-909 DANCE KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 2.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 240,
            "name": "240: ELECTRONIC PERCUSSION KIT",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 2.2,
            "cut": 12000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 241,
            "name": "241: LATIN CONGAS & BONGOS",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 1.8,
            "cut": 8500,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0
      },
      {
            "id": 242,
            "name": "242: ORCHESTRAL PERCUSSION FULL BATTERY",
            "category": "Drums, Splits & Tutti",
            "type": "drums",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "orch_timpani",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 243,
            "name": "243: GRAND PIANO & FULL STRINGS",
            "category": "Drums, Splits & Tutti",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.75,
            "layerDet": 3
      },
      {
            "id": 244,
            "name": "244: GRAND PIANO & CHOIR PAD",
            "category": "Drums, Splits & Tutti",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 245,
            "name": "245: RHODES & GRAND STRINGS LAYER",
            "category": "Drums, Splits & Tutti",
            "type": "ep",
            "oct": 0,
            "att": 0.005,
            "dec": 4.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 246,
            "name": "246: B3 ORGAN & BRASS STABS LAYER",
            "category": "Drums, Splits & Tutti",
            "type": "b3",
            "oct": 0,
            "att": 0.005,
            "dec": 3.8,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.75,
            "layerDet": 0
      },
      {
            "id": 247,
            "name": "247: UPRIGHT BASS / PIANO SPLIT",
            "category": "Drums, Splits & Tutti",
            "type": "split",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0,
            "splitNote": 54,
            "leftType": "bass",
            "rightType": "piano"
      },
      {
            "id": 248,
            "name": "248: FRETLESS BASS / RHODES SPLIT",
            "category": "Drums, Splits & Tutti",
            "type": "split",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0,
            "splitNote": 54,
            "leftType": "bass",
            "rightType": "ep"
      },
      {
            "id": 249,
            "name": "249: STRINGS / FLUTE & OBOE SPLIT",
            "category": "Drums, Splits & Tutti",
            "type": "split",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0,
            "splitNote": 60,
            "leftType": "strings",
            "rightType": "winds"
      },
      {
            "id": 250,
            "name": "250: ACOUSTIC DRUMS / SLAP BASS SPLIT",
            "category": "Drums, Splits & Tutti",
            "type": "split",
            "oct": 0,
            "att": 0.005,
            "dec": 2.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": null,
            "layerVol": 0.0,
            "layerDet": 0,
            "splitNote": 48,
            "leftType": "drums",
            "rightType": "bass"
      },
      {
            "id": 251,
            "name": "251: FULL K250 SYMPHONIC ORCHESTRA",
            "category": "Drums, Splits & Tutti",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 5.2,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.8,
            "layerDet": 5
      },
      {
            "id": 252,
            "name": "252: K250 TOUCH ORCHESTRA (1984 TUTTI)",
            "category": "Drums, Splits & Tutti",
            "type": "horns",
            "oct": 0,
            "att": 0.015,
            "dec": 3.8,
            "cut": 11500,
            "filt": "lowpass",
            "res": 2.2,
            "det": 5,
            "vibR": 4.5,
            "vibD": 8,
            "layer": "strings_swell",
            "layerVol": 0.85,
            "layerDet": 6
      },
      {
            "id": 253,
            "name": "253: K250 SPACE ODYSSEY SOUNDSCAPE",
            "category": "Drums, Splits & Tutti",
            "type": "choir",
            "oct": 0,
            "att": 0.35,
            "dec": 6.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 254,
            "name": "254: VINTAGE 1984 FACTORY DEMO PATCH 1",
            "category": "Drums, Splits & Tutti",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 4.5,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "horn_c3",
            "layerVol": 0.65,
            "layerDet": 0
      },
      {
            "id": 255,
            "name": "255: VINTAGE 1984 FACTORY DEMO PATCH 2",
            "category": "Drums, Splits & Tutti",
            "type": "strings",
            "oct": 0,
            "att": 0.005,
            "dec": 5.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "choir_pad",
            "layerVol": 0.7,
            "layerDet": 0
      },
      {
            "id": 256,
            "name": "256: K250 MASTER SYMPHONIQUE",
            "category": "Drums, Splits & Tutti",
            "type": "piano",
            "oct": 0,
            "att": 0.005,
            "dec": 6.0,
            "cut": 16000,
            "filt": "lowpass",
            "res": 1.0,
            "det": 0,
            "vibR": 0,
            "vibD": 0,
            "layer": "strings_swell",
            "layerVol": 0.85,
            "layerDet": 4
      }
];

    const DX7_ALGORITHMS = [
      { id: 1,  carriers: [1,3],       edges: [[2,1],[6,5],[5,4],[4,3]],                 fbOp: 6 },
      { id: 2,  carriers: [1,3],       edges: [[2,1],[6,5],[5,4],[4,3]],                 fbOp: 2 },
      { id: 3,  carriers: [1,4],       edges: [[3,2],[2,1],[6,5],[5,4]],                 fbOp: 6 },
      { id: 4,  carriers: [1,4],       edges: [[3,2],[2,1],[6,5],[5,4]],                 fbOp: 4 },
      { id: 5,  carriers: [1,3,5],     edges: [[2,1],[4,3],[6,5]],                       fbOp: 6 },
      { id: 6,  carriers: [1,3,5],     edges: [[2,1],[4,3],[6,5]],                       fbOp: 5 },
      { id: 7,  carriers: [1,3],       edges: [[2,1],[4,3],[6,5],[5,3]],                 fbOp: 6 },
      { id: 8,  carriers: [1,3],       edges: [[2,1],[4,3],[6,5],[5,3]],                 fbOp: 4 },
      { id: 9,  carriers: [1,3],       edges: [[2,1],[4,3],[6,5],[5,3]],                 fbOp: 2 },
      { id: 10, carriers: [1,4],       edges: [[3,2],[2,1],[5,4],[6,4]],                 fbOp: 3 },
      { id: 11, carriers: [1,4],       edges: [[3,2],[2,1],[5,4],[6,4]],                 fbOp: 6 },
      { id: 12, carriers: [1,3],       edges: [[2,1],[4,3],[5,3],[6,3]],                 fbOp: 2 },
      { id: 13, carriers: [1,3],       edges: [[2,1],[4,3],[5,3],[6,3]],                 fbOp: 6 },
      { id: 14, carriers: [1,3],       edges: [[2,1],[6,4],[5,4],[4,3]],                 fbOp: 6 },
      { id: 15, carriers: [1,3],       edges: [[2,1],[6,4],[5,4],[4,3]],                 fbOp: 2 },
      { id: 16, carriers: [1],         edges: [[2,1],[4,3],[3,1],[6,5],[5,1]],           fbOp: 6 },
      { id: 17, carriers: [1],         edges: [[2,1],[4,3],[3,1],[6,5],[5,1]],           fbOp: 2 },
      { id: 18, carriers: [1],         edges: [[2,1],[3,1],[6,5],[5,4],[4,1]],           fbOp: 3 },
      { id: 19, carriers: [1,4,5],     edges: [[3,2],[2,1],[6,4],[6,5]],                 fbOp: 6 },
      { id: 20, carriers: [1,2,4],     edges: [[3,1],[3,2],[5,4],[6,4]],                 fbOp: 3 },
      { id: 21, carriers: [1,2,4,5],   edges: [[3,1],[3,2],[6,4],[6,5]],                 fbOp: 3 },
      { id: 22, carriers: [1,3,4,5],   edges: [[2,1],[6,3],[6,4],[6,5]],                 fbOp: 6 },
      { id: 23, carriers: [1,2,4,5],   edges: [[3,2],[6,4],[6,5]],                       fbOp: 6 },
      { id: 24, carriers: [1,2,3,4,5], edges: [[6,3],[6,4],[6,5]],                       fbOp: 6 },
      { id: 25, carriers: [1,2,3,4,5], edges: [[6,4],[6,5]],                             fbOp: 6 },
      { id: 26, carriers: [1,2,4],     edges: [[3,2],[5,4],[6,4]],                       fbOp: 6 },
      { id: 27, carriers: [1,2,4],     edges: [[3,2],[5,4],[6,4]],                       fbOp: 3 },
      { id: 28, carriers: [1,3,6],     edges: [[2,1],[5,4],[4,3]],                       fbOp: 5 },
      { id: 29, carriers: [1,2,3,5],   edges: [[4,3],[6,5]],                             fbOp: 6 },
      { id: 30, carriers: [1,2,3,6],   edges: [[5,4],[4,3]],                             fbOp: 5 },
      { id: 31, carriers: [1,2,3,4,5], edges: [[6,5]],                                   fbOp: 6 },
      { id: 32, carriers: [1,2,3,4,5,6], edges: [],                                      fbOp: 6 }
    ];

    const dx7Bank = [
      {
        name: "E.PIANO 1 ",
        alg: 5, feedback: 6, modDepth: 1.0,
        ops: [
          { ratio: 1.0,  level: 0.99, dec: 2.2, detune: -2 },
          { ratio: 14.0, level: 0.56, dec: 0.28, detune: 0 },
          { ratio: 1.0,  level: 0.92, dec: 2.0, detune: 2 },
          { ratio: 1.0,  level: 0.68, dec: 1.1, detune: 0 },
          { ratio: 1.0,  level: 0.85, dec: 2.4, detune: 5 },
          { ratio: 1.0,  level: 0.58, dec: 0.9, detune: -5 }
        ]
      },
      {
        name: "BASS 1    ",
        alg: 16, feedback: 7, modDepth: 1.2,
        ops: [
          { ratio: 0.5, level: 0.99, dec: 0.65, detune: 0 },
          { ratio: 1.0, level: 0.82, dec: 0.25, detune: 1 },
          { ratio: 1.0, level: 0.65, dec: 0.45, detune: -2 },
          { ratio: 2.0, level: 0.52, dec: 0.20, detune: 0 },
          { ratio: 3.0, level: 0.48, dec: 0.18, detune: 2 },
          { ratio: 1.0, level: 0.72, dec: 0.14, detune: 0 }
        ]
      },
      {
        name: "BRASS 1   ",
        alg: 22, feedback: 6, modDepth: 1.1,
        ops: [
          { ratio: 1.0, level: 0.95, dec: 1.5, detune: -4 },
          { ratio: 1.0, level: 0.76, dec: 0.8, detune: 0 },
          { ratio: 1.0, level: 0.88, dec: 1.5, detune: 4 },
          { ratio: 1.0, level: 0.85, dec: 1.5, detune: -8 },
          { ratio: 2.0, level: 0.62, dec: 1.2, detune: 8 },
          { ratio: 1.0, level: 0.82, dec: 0.9, detune: 0 }
        ]
      },
      {
        name: "MARIMBA   ",
        alg: 19, feedback: 4, modDepth: 0.95,
        ops: [
          { ratio: 1.0, level: 0.99, dec: 0.55, detune: 0 },
          { ratio: 4.0, level: 0.68, dec: 0.14, detune: 0 },
          { ratio: 3.98, level: 0.42, dec: 0.09, detune: 3 },
          { ratio: 2.0, level: 0.55, dec: 0.35, detune: -3 },
          { ratio: 1.0, level: 0.60, dec: 0.45, detune: 2 },
          { ratio: 8.0, level: 0.50, dec: 0.08, detune: 0 }
        ]
      },
      {
        name: "TUB BELLS ",
        alg: 5, feedback: 5, modDepth: 1.15,
        ops: [
          { ratio: 1.0,  level: 0.96, dec: 2.8, detune: 0 },
          { ratio: 3.5,  level: 0.78, dec: 1.9, detune: 4 },
          { ratio: 1.0,  level: 0.80, dec: 2.6, detune: -4 },
          { ratio: 7.07, level: 0.55, dec: 1.1, detune: 0 },
          { ratio: 2.0,  level: 0.62, dec: 2.2, detune: 3 },
          { ratio: 5.41, level: 0.64, dec: 0.7, detune: -3 }
        ]
      },
      {
        name: "STRINGS 1 ",
        alg: 2, feedback: 5, modDepth: 0.85,
        ops: [
          { ratio: 1.0, level: 0.92, dec: 2.6, detune: -9 },
          { ratio: 1.0, level: 0.52, dec: 2.0, detune: 4 },
          { ratio: 1.0, level: 0.92, dec: 2.6, detune: 9 },
          { ratio: 2.0, level: 0.45, dec: 1.8, detune: -5 },
          { ratio: 1.0, level: 0.42, dec: 1.9, detune: 6 },
          { ratio: 1.0, level: 0.48, dec: 1.5, detune: 0 }
        ]
      },
      {
        name: "CALIOPE   ",
        alg: 32, feedback: 3, modDepth: 0.9,
        ops: [
          { ratio: 1.0, level: 0.90, dec: 1.8, detune: 0 },
          { ratio: 2.0, level: 0.75, dec: 1.8, detune: 3 },
          { ratio: 3.0, level: 0.65, dec: 1.7, detune: -3 },
          { ratio: 4.0, level: 0.50, dec: 1.6, detune: 5 },
          { ratio: 6.0, level: 0.36, dec: 1.4, detune: -5 },
          { ratio: 8.0, level: 0.25, dec: 1.2, detune: 0 }
        ]
      },
      {
        name: "SYN-LEAD  ",
        alg: 1, feedback: 7, modDepth: 1.25,
        ops: [
          { ratio: 1.0, level: 0.99, dec: 1.6, detune: -6 },
          { ratio: 1.0, level: 0.84, dec: 0.9, detune: 5 },
          { ratio: 2.0, level: 0.85, dec: 1.6, detune: 6 },
          { ratio: 1.0, level: 0.72, dec: 0.8, detune: -3 },
          { ratio: 3.0, level: 0.58, dec: 0.5, detune: 4 },
          { ratio: 1.0, level: 0.75, dec: 0.7, detune: 0 }
        ]
      }
    ];
let activeDx7PatchIdx = 0;

    const LAYER_BASE_NOTES = {
      "strings_swell": 60,
      "choir_pad": 60,
      "piano_c2": 36,
      "piano_c3": 48,
      "piano_c4": 61,
      "piano_e4": 64,
      "piano_c5": 78,
      "ep_c3": 48,
      "ep_c5": 72,
      "horn_c3": 46,
      "horn_d4": 50,
      "clav_f3": 53,
      "b3_g3": 43,
      "b3_c5": 60,
      "orch_timpani": 48
    };

    const MS_STEINWAY = [
      { note: 33, key: "sal_a1", tune: 6 },
      { note: 36, key: "sal_c2", tune: 9 },
      { note: 39, key: "sal_ds2", tune: 6 },
      { note: 42, key: "sal_fs2", tune: 5 },
      { note: 45, key: "sal_a2", tune: 2 },
      { note: 48, key: "sal_c3", tune: 4 },
      { note: 51, key: "sal_ds3", tune: 3 },
      { note: 54, key: "sal_fs3", tune: 3 },
      { note: 57, key: "sal_a3", tune: 0 },
      { note: 60, key: "sal_c4", tune: 0 },
      { note: 63, key: "sal_ds4", tune: -1 },
      { note: 66, key: "sal_fs4", tune: 2 },
      { note: 69, key: "sal_a4", tune: -1 },
      { note: 72, key: "sal_c5", tune: -4 },
      { note: 75, key: "sal_ds5", tune: -3 },
      { note: 78, key: "sal_fs5", tune: -5 },
      { note: 81, key: "sal_a5", tune: -7 },
      { note: 84, key: "sal_c6", tune: -10 },
      { note: 87, key: "sal_ds6", tune: -8 },
      { note: 90, key: "sal_fs6", tune: -13 }
    ];

    const MS_HORN = [
      { note: 46, key: "horn_c3horn", tune: -19 },
      { note: 55, key: "horn_g3horn", tune: 1 },
      { note: 62, key: "horn_d4horn", tune: -8 },
      { note: 76, key: "horn_e5horn", tune: 0 },
      { note: 84, key: "horn_c6horn", tune: -3 }
    ];

    const MS_SAX = [
      { note: 38, key: "bear_sax_d1", tune: 0 },
      { note: 41, key: "bear_sax_f1", tune: -1 },
      { note: 44, key: "bear_sax_ab1", tune: -1 },
      { note: 47, key: "bear_sax_b1", tune: -1 },
      { note: 50, key: "weresax_d2", tune: 0 },
      { note: 53, key: "weresax_f2", tune: 0 },
      { note: 56, key: "weresax_ab2", tune: 0 },
      { note: 59, key: "weresax_b2", tune: 0 },
      { note: 62, key: "weresax_d3", tune: 0 },
      { note: 65, key: "weresax_f3", tune: -1 },
      { note: 68, key: "weresax_ab3", tune: 0 },
      { note: 71, key: "weresax_b3", tune: 1 },
      { note: 74, key: "weresax_d4", tune: 0 },
      { note: 77, key: "weresax_f4", tune: 0 },
      { note: 80, key: "weresax_ab4", tune: 0 }
    ];

    const MS_PIPE = [
      { note: 48, key: "vsco_organ_01", tune: -1 },
      { note: 48, key: "vsco_organ_13", tune: -2 },
      { note: 54, key: "vsco_organ_07", tune: -5 },
      { note: 54, key: "vsco_organ_19", tune: 0 },
      { note: 60, key: "vsco_organ_25", tune: 2 },
      { note: 66, key: "vsco_organ_31", tune: 0 },
      { note: 66, key: "vsco_organ_43", tune: 0 },
      { note: 72, key: "vsco_organ_37", tune: 1 },
      { note: 72, key: "vsco_organ_49", tune: -1 },
      { note: 78, key: "vsco_organ_55", tune: 0 },
      { note: 84, key: "vsco_organ_61", tune: 4 }
    ];

    const MS_B3 = [
      { note: 36, key: "b3dist_distb3_c2", tune: -2 },
      { note: 48, key: "b3dist_distb3_c3", tune: -6 },
      { note: 55, key: "b3dist_distb3_g3", tune: -6 },
      { note: 61, key: "b3dist_distb3_cs4", tune: -6 },
      { note: 68, key: "b3dist_distb3_gs4", tune: -6 },
      { note: 73, key: "b3dist_distb3_cs5", tune: -6 },
      { note: 80, key: "b3dist_distb3_gs5", tune: -6 },
      { note: 87, key: "b3dist_distb3_ds6", tune: -7 },
      { note: 94, key: "b3dist_distb3_as6", tune: -6 }
    ];

    const MS_EP = [
      { note: 35, key: "jrhodes_35", tune: 0 },
      { note: 40, key: "jrhodes_40", tune: -9 },
      { note: 45, key: "jrhodes_45", tune: -4 },
      { note: 50, key: "jrhodes_50", tune: -7 },
      { note: 55, key: "jrhodes_55", tune: -4 },
      { note: 59, key: "jrhodes_59", tune: -2 },
      { note: 65, key: "jrhodes_65", tune: 0 },
      { note: 71, key: "jrhodes_71", tune: -3 },
      { note: 76, key: "jrhodes_76", tune: -4 }
    ];

    const MS_CLAV = [
      { note: 41, key: "clav_clavinet_2_f4", tune: 2 },
      { note: 48, key: "clav_jv80clav_c4clav", tune: -14 },
      { note: 53, key: "clav_clavinet_2_f5", tune: 4 },
      { note: 60, key: "clav_jv80clav_c5clav", tune: -18 },
      { note: 65, key: "clav_clavinet_2_f6rate", tune: 4 }
    ];

    const MS_GTR_FULL = [
      { note: 40, key: "emily_gtr_e2", tune: -12 },
      { note: 45, key: "emily_gtr_a2", tune: -8 },
      { note: 48, key: "emily_gtr_c3", tune: -5 },
      { note: 51, key: "emily_gtr_eb3", tune: -2 },
      { note: 54, key: "emily_gtr_gb3", tune: 5 },
      { note: 57, key: "emily_gtr_a3", tune: -1 },
      { note: 60, key: "emily_gtr_c4", tune: 4 },
      { note: 63, key: "emily_gtr_eb4", tune: 0 },
      { note: 66, key: "emily_gtr_gb4", tune: 0 },
      { note: 69, key: "emily_gtr_a4", tune: 2 },
      { note: 72, key: "emily_gtr_c5", tune: 1 },
      { note: 75, key: "emily_gtr_eb5", tune: 9 },
      { note: 78, key: "emily_gtr_gb5", tune: 0 },
      { note: 81, key: "emily_gtr_a5", tune: -1 },
      { note: 86, key: "emily_gtr_d6", tune: 6 }
    ];

    const MS_GTR_HARM = [
      { note: 40, key: "emily_soft_e2", tune: -1 },
      { note: 45, key: "emily_soft_a2", tune: -3 },
      { note: 48, key: "emily_soft_c3", tune: -4 },
      { note: 51, key: "emily_soft_eb3", tune: 3 },
      { note: 54, key: "emily_soft_gb3", tune: 8 },
      { note: 57, key: "emily_soft_a3", tune: -3 },
      { note: 60, key: "emily_soft_c4", tune: 3 },
      { note: 63, key: "emily_soft_eb4", tune: -2 },
      { note: 66, key: "emily_soft_gb4", tune: -1 },
      { note: 69, key: "emily_soft_a4", tune: -1 },
      { note: 72, key: "emily_soft_c5", tune: 0 },
      { note: 75, key: "emily_soft_eb5", tune: -8 },
      { note: 78, key: "emily_soft_gb5", tune: -1 },
      { note: 81, key: "emily_soft_a5", tune: -5 },
      { note: 86, key: "emily_soft_d6", tune: -3 }
    ];

    const MS_GTR_MUTE = [
      { note: 41, key: "gtr_mute_f2", tune: -7 },
      { note: 44, key: "gtr_mute_gs2", tune: -2 },
      { note: 47, key: "gtr_mute_b2", tune: -14 },
      { note: 50, key: "gtr_mute_d3", tune: -17 },
      { note: 53, key: "gtr_mute_f3", tune: -13 },
      { note: 56, key: "gtr_mute_gs3", tune: -5 },
      { note: 59, key: "gtr_mute_b3", tune: 0 },
      { note: 62, key: "gtr_mute_d4", tune: -1 },
      { note: 65, key: "gtr_mute_f4", tune: -4 },
      { note: 68, key: "gtr_mute_gs4", tune: 3 },
      { note: 71, key: "gtr_mute_b4", tune: -6 },
      { note: 74, key: "gtr_mute_d5", tune: -7 },
      { note: 77, key: "gtr_mute_f5", tune: -3 },
      { note: 80, key: "gtr_mute_gs5", tune: -7 }
    ];
    const MS_GTR = MS_GTR_FULL;
    const MS_GTR_JAZZ = [
      { note: 40, key: "shiny_archtop_e2", tune: -5 },
      { note: 42, key: "shiny_archtop_gb2", tune: -8 },
      { note: 45, key: "shiny_archtop_a2", tune: 5 },
      { note: 48, key: "shiny_archtop_c3", tune: 0 },
      { note: 51, key: "shiny_archtop_eb3", tune: -10 },
      { note: 54, key: "shiny_archtop_gb3", tune: -3 },
      { note: 57, key: "shiny_archtop_a3", tune: -13 },
      { note: 60, key: "shiny_archtop_c4", tune: -7 },
      { note: 63, key: "shiny_archtop_eb4", tune: -3 },
      { note: 66, key: "shiny_archtop_gb4", tune: -2 },
      { note: 69, key: "shiny_archtop_a4", tune: -1 },
      { note: 72, key: "shiny_archtop_c5", tune: 2 },
      { note: 75, key: "shiny_archtop_eb5", tune: 4 },
      { note: 78, key: "shiny_archtop_gb5", tune: 7 },
      { note: 81, key: "shiny_archtop_a5", tune: 7 },
      { note: 84, key: "shiny_archtop_c6", tune: 5 }
    ];
    const MS_GTR_ELECTRIC = [
      { note: 40, key: "bg_el_e3", tune: -4 },
      { note: 42, key: "bg_el_gb3", tune: -7 },
      { note: 45, key: "bg_el_a3", tune: 6 },
      { note: 48, key: "bg_el_c4", tune: 0 },
      { note: 51, key: "bg_el_eb4", tune: -10 },
      { note: 54, key: "bg_el_gb4", tune: -3 },
      { note: 57, key: "bg_el_a4", tune: -13 },
      { note: 60, key: "bg_el_c5", tune: -7 },
      { note: 63, key: "bg_el_eb5", tune: -2 },
      { note: 66, key: "bg_el_gb5", tune: -2 },
      { note: 69, key: "bg_el_a5", tune: 0 },
      { note: 72, key: "bg_el_c6", tune: 2 },
      { note: 75, key: "bg_el_eb6", tune: 4 },
      { note: 78, key: "bg_el_gb6", tune: 7 },
      { note: 81, key: "bg_el_a6", tune: 7 }
    ];
    const MS_GTR_ACOUSTIC = [
      { note: 40, key: "shiny_ac_e2", tune: 4 },
      { note: 42, key: "shiny_ac_gb2", tune: 6 },
      { note: 45, key: "shiny_ac_a2", tune: 4 },
      { note: 48, key: "shiny_ac_c3", tune: 8 },
      { note: 51, key: "shiny_ac_eb3", tune: 3 },
      { note: 54, key: "shiny_ac_gb3", tune: -2 },
      { note: 57, key: "shiny_ac_a3", tune: 4 },
      { note: 60, key: "shiny_ac_c4", tune: 3 },
      { note: 63, key: "shiny_ac_eb4", tune: 2 },
      { note: 66, key: "shiny_ac_gb4", tune: -3 },
      { note: 69, key: "shiny_ac_a4", tune: 3 },
      { note: 72, key: "shiny_ac_c5", tune: 4 },
      { note: 75, key: "shiny_ac_eb5", tune: 0 },
      { note: 78, key: "shiny_ac_gb5", tune: -1 },
      { note: 81, key: "shiny_ac_a5", tune: 0 },
      { note: 84, key: "shiny_ac_c6", tune: 2 }
    ];


    const MS_VIOLIN_SUS = [
      { note: 55, key: "sso_vln_sus_g3", tune: -7 },
      { note: 58, key: "sso_vln_sus_as3", tune: 2 },
      { note: 62, key: "vsco_vln_d3", tune: 2 },
      { note: 66, key: "vsco_vln_fs3", tune: -2 },
      { note: 69, key: "vsco_vln_a3", tune: -4 },
      { note: 72, key: "vsco_vln_c4", tune: 12 },
      { note: 76, key: "vsco_vln_e4", tune: -1 },
      { note: 79, key: "vsco_vln_g4", tune: 4 },
      { note: 83, key: "vsco_vln_b4", tune: -6 },
      { note: 86, key: "vsco_vln_d5", tune: 2 }
    ];
    const MS_VIOLIN_STC = [
      { note: 55, key: "sso_vln_stc_g3", tune: 5 },
      { note: 61, key: "sso_vln_stc_cs4", tune: -5 },
      { note: 67, key: "sso_vln_stc_g4", tune: 12 },
      { note: 73, key: "sso_vln_stc_cs5", tune: -9 },
      { note: 79, key: "sso_vln_stc_g5", tune: 15 },
      { note: 85, key: "sso_vln_stc_cs6", tune: 11 }
    ];
    const MS_VIOLIN_PIZ = [
      { note: 55, key: "sso_vln_piz_g3", tune: 55 },
      { note: 61, key: "sso_vln_piz_cs4", tune: 46 },
      { note: 67, key: "sso_vln_piz_g4", tune: -30 },
      { note: 73, key: "sso_vln_piz_cs5", tune: -10 }
    ];
    const MS_VIOLA_SUS = [
      { note: 48, key: "sso_vla_sus_c3", tune: 1 },
      { note: 52, key: "vsco_vla_e2", tune: -3 },
      { note: 55, key: "vsco_vla_g2", tune: 1 },
      { note: 59, key: "vsco_vla_b2", tune: -2 },
      { note: 62, key: "vsco_vla_d3", tune: -2 },
      { note: 65, key: "vsco_vla_f3", tune: 5 },
      { note: 69, key: "vsco_vla_a3", tune: -7 },
      { note: 72, key: "vsco_vla_c4", tune: -3 },
      { note: 76, key: "vsco_vla_e4", tune: -10 },
      { note: 79, key: "vsco_vla_g4", tune: -4 }
    ];
    const MS_CELLO_SUS = [
      { note: 39, key: "sso_vlc_sus_ds2", tune: 1 },
      { note: 40, key: "vsco_vlc_e1", tune: 12 },
      { note: 43, key: "vsco_vlc_g1", tune: 1 },
      { note: 47, key: "vsco_vlc_b1", tune: -5 },
      { note: 50, key: "vsco_vlc_d2", tune: -5 },
      { note: 53, key: "vsco_vlc_f2", tune: -18 },
      { note: 57, key: "vsco_vlc_a2", tune: -1 },
      { note: 60, key: "vsco_vlc_c3", tune: -2 },
      { note: 64, key: "vsco_vlc_e3", tune: -18 },
      { note: 67, key: "vsco_vlc_g3", tune: 1 }
    ];
    const MS_BASS_SUS = [
      { note: 33, key: "f3r_cb_a1", tune: 1 },
      { note: 36, key: "f3r_cb_c2", tune: -5 },
      { note: 39, key: "f3r_cb_eb1", tune: 2 },
      { note: 42, key: "f3r_cb_gb1", tune: -1 },
      { note: 43, key: "f3r_cb_g2", tune: 0 }
    ];
    const MS_UPRIGHT_BASS = [
      { note: 28, key: "f3r_abass_e1", tune: 0 },
      { note: 31, key: "f3r_abass_g1", tune: 1 },
      { note: 34, key: "f3r_abass_bb1", tune: 1 },
      { note: 36, key: "f3r_abass_c2", tune: 0 },
      { note: 39, key: "f3r_abass_eb2", tune: 0 },
      { note: 42, key: "f3r_abass_gb2", tune: 2 },
      { note: 45, key: "f3r_abass_a2", tune: 1 },
      { note: 48, key: "f3r_abass_c3", tune: 1 }
    ];
    const MS_GRAND_STRINGS = [
      { note: 30, key: "sso_cb_sus_fs1", tune: 1 },
      { note: 40, key: "vsco_vlc_e1", tune: 12 },
      { note: 47, key: "vsco_vlc_b1", tune: -5 },
      { note: 48, key: "k2000_grand_strings_c3", tune: 0 },
      { note: 55, key: "vsco_vla_g2", tune: 1 },
      { note: 62, key: "vsco_vla_d3", tune: -2 },
      { note: 69, key: "vsco_vln_a3", tune: -4 },
      { note: 76, key: "vsco_vln_e4", tune: -1 },
      { note: 83, key: "vsco_vln_b4", tune: -6 }
    ];
    const MS_FLUTE = [
      { note: 60, key: "vsco_flt_c3", tune: 3 },
      { note: 64, key: "vsco_flt_e3", tune: 2 },
      { note: 69, key: "vsco_flt_a3", tune: 1 },
      { note: 72, key: "vsco_flt_c4", tune: 0 },
      { note: 76, key: "vsco_flt_e4", tune: 1 },
      { note: 81, key: "vsco_flt_a4", tune: 0 },
      { note: 84, key: "vsco_flt_c5", tune: -2 },
      { note: 88, key: "vsco_flt_e5", tune: -4 },
      { note: 93, key: "vsco_flt_a5", tune: -2 },
      { note: 96, key: "vsco_flt_c6", tune: 1 }
    ];
    const MS_PICCOLO = [
      { note: 79, key: "vsco_picc_g4", tune: -4 },
      { note: 84, key: "vsco_picc_c5", tune: 4 },
      { note: 91, key: "vsco_picc_g5", tune: -8 },
      { note: 96, key: "vsco_picc_c6", tune: -8 },
      { note: 103, key: "vsco_picc_g6", tune: 0 },
      { note: 106, key: "vsco_picc_as6", tune: 8 }
    ];
    const MS_OBOE = [
      { note: 50, key: "vsco_obo_d3", tune: 0 },
      { note: 53, key: "vsco_obo_f3", tune: -3 },
      { note: 58, key: "vsco_obo_as3", tune: -1 },
      { note: 62, key: "vsco_obo_d4", tune: -1 },
      { note: 65, key: "vsco_obo_f4", tune: -4 },
      { note: 70, key: "vsco_obo_as4", tune: 1 },
      { note: 74, key: "vsco_obo_d5", tune: -1 },
      { note: 77, key: "vsco_obo_f5", tune: 1 }
    ];
    const MS_CLARINET = [
      { note: 50, key: "vsco_clar_d2", tune: -4 },
      { note: 53, key: "vsco_clar_f2", tune: -2 },
      { note: 58, key: "vsco_clar_as2", tune: -1 },
      { note: 62, key: "vsco_clar_d3", tune: -3 },
      { note: 65, key: "vsco_clar_f3", tune: -6 },
      { note: 70, key: "vsco_clar_as3", tune: -3 },
      { note: 74, key: "vsco_clar_d4", tune: -3 },
      { note: 77, key: "vsco_clar_f4", tune: -5 },
      { note: 82, key: "vsco_clar_as4", tune: -4 },
      { note: 86, key: "vsco_clar_d5", tune: -6 },
      { note: 90, key: "vsco_clar_fs5", tune: 83 }
    ];
    const MS_BASSOON = [
      { note: 34, key: "sso_bsn_sus_as1", tune: -6 },
      { note: 40, key: "sso_bsn_sus_e2", tune: -1 },
      { note: 46, key: "sso_bsn_sus_as2", tune: -1 },
      { note: 52, key: "sso_bsn_sus_e3", tune: -3 },
      { note: 58, key: "sso_bsn_sus_as3", tune: -1 },
      { note: 64, key: "sso_bsn_sus_e4", tune: 0 }
    ];
    const MS_FRHORN = [
      { note: 33, key: "vsco_hrn_a0", tune: 3 },
      { note: 36, key: "vsco_hrn_c1", tune: 2 },
      { note: 39, key: "vsco_hrn_ds1", tune: 4 },
      { note: 43, key: "vsco_hrn_g1", tune: 7 },
      { note: 46, key: "vsco_hrn_as1", tune: 3 },
      { note: 50, key: "vsco_hrn_d2", tune: 2 },
      { note: 53, key: "vsco_hrn_f2", tune: 7 },
      { note: 57, key: "vsco_hrn_a2", tune: 4 },
      { note: 60, key: "vsco_hrn_c3", tune: 1 },
      { note: 74, key: "vsco_hrn_d4", tune: -6 },
      { note: 77, key: "vsco_hrn_f4", tune: -2 }
    ];
    const MS_BRASS_STAC = [
      { note: 41, key: "vsco_bstac_f1", tune: 9 },
      { note: 46, key: "vsco_bstac_as1", tune: 12 },
      { note: 50, key: "vsco_bstac_d2h", tune: -4 },
      { note: 53, key: "vsco_bstac_f2", tune: 1 },
      { note: 57, key: "vsco_bstac_a2h", tune: 2 },
      { note: 58, key: "vsco_bstac_as2", tune: -1 },
      { note: 72, key: "vsco_bstac_c3h", tune: -1 },
      { note: 67, key: "vsco_bstac_g3t", tune: -11 },
      { note: 70, key: "vsco_bstac_as3t", tune: 1 },
      { note: 74, key: "vsco_bstac_d4h", tune: 3 },
      { note: 77, key: "vsco_bstac_f4h", tune: -1 },
      { note: 81, key: "vsco_bstac_a4t", tune: -14 },
      { note: 84, key: "vsco_bstac_c5t", tune: -7 }
    ];
    const MS_TRUMPET = [
      { note: 53, key: "vsco_tpt_f2", tune: 4 },
      { note: 57, key: "vsco_tpt_a2", tune: 2 },
      { note: 60, key: "vsco_tpt_c3", tune: 0 },
      { note: 63, key: "vsco_tpt_ds3", tune: 0 },
      { note: 67, key: "vsco_tpt_g3", tune: -6 },
      { note: 70, key: "vsco_tpt_as3", tune: -3 },
      { note: 74, key: "vsco_tpt_d4", tune: -6 },
      { note: 77, key: "vsco_tpt_f4", tune: 2 },
      { note: 81, key: "vsco_tpt_a4", tune: -4 },
      { note: 84, key: "vsco_tpt_c5", tune: 2 }
    ];
    const MS_TRUMPET_HARMON = [
      { note: 58, key: "vsco_tpt_hm_as2", tune: 4 },
      { note: 60, key: "vsco_tpt_hm_c3", tune: -5 },
      { note: 63, key: "vsco_tpt_hm_ds3", tune: -1 },
      { note: 68, key: "vsco_tpt_hm_gs3", tune: 0 },
      { note: 70, key: "vsco_tpt_hm_as3", tune: -1 },
      { note: 74, key: "vsco_tpt_hm_d4", tune: -2 },
      { note: 77, key: "vsco_tpt_hm_f4", tune: 0 },
      { note: 81, key: "vsco_tpt_hm_a4", tune: -1 }
    ];
    const MS_TRUMPET_VIB = [
      { note: 53, key: "vsco_shtpt_f2", tune: 6 },
      { note: 57, key: "vsco_shtpt_a2", tune: 0 },
      { note: 60, key: "vsco_shtpt_c3", tune: 5 },
      { note: 63, key: "vsco_shtpt_ds3", tune: -7 },
      { note: 65, key: "vsco_shtpt_f3", tune: -9 },
      { note: 67, key: "vsco_shtpt_g3", tune: 2 },
      { note: 70, key: "vsco_shtpt_as3", tune: 1 },
      { note: 74, key: "vsco_shtpt_d4", tune: 6 },
      { note: 77, key: "vsco_shtpt_f4", tune: -1 },
      { note: 81, key: "vsco_shtpt_a4", tune: 0 },
      { note: 84, key: "vsco_shtpt_c5", tune: 3 }
    ];
    const MS_TROMBONE = [
      { note: 34, key: "vsco_tbn_as0", tune: 1 },
      { note: 37, key: "vsco_tbn_cs1", tune: 0 },
      { note: 39, key: "vsco_tbn_ds1", tune: 0 },
      { note: 41, key: "vsco_tbn_f1", tune: 0 },
      { note: 46, key: "vsco_tbn_as1", tune: 0 },
      { note: 50, key: "vsco_tbn_d2", tune: 0 },
      { note: 53, key: "vsco_tbn_f2", tune: 0 },
      { note: 60, key: "vsco_tbn_c3", tune: 0 },
      { note: 61, key: "vsco_tbn_cs3", tune: 0 },
      { note: 63, key: "vsco_tbn_ds3", tune: 0 },
      { note: 65, key: "vsco_tbn_f3", tune: 0 }
    ];
    const MS_TUBA = [
      { note: 29, key: "wartuba_f0", tune: -3 },
      { note: 31, key: "wartuba_g0", tune: -16 },
      { note: 33, key: "wartuba_a0", tune: -30 },
      { note: 34, key: "wartuba_bb0", tune: -17 },
      { note: 36, key: "wartuba_c1", tune: -17 },
      { note: 39, key: "wartuba_eb1", tune: -17 },
      { note: 41, key: "wartuba_f1", tune: -2 },
      { note: 43, key: "wartuba_g1", tune: -9 },
      { note: 46, key: "wartuba_bb1", tune: 13 },
      { note: 48, key: "wartuba_c2", tune: 24 },
      { note: 51, key: "wartuba_eb2", tune: -15 },
      { note: 55, key: "wartuba_g2", tune: 7 }
    ];
    const MS_HARP = [
      { note: 36, key: "sso_hrp_c2", tune: -13 },
      { note: 48, key: "sso_hrp_c3", tune: -17 },
      { note: 60, key: "sso_hrp_c4", tune: -11 },
      { note: 72, key: "sso_hrp_c5", tune: -15 },
      { note: 84, key: "sso_hrp_c6", tune: -7 }
    ];
    const MS_VIBES = [
      { note: 48, key: "sso_vibe_c3", tune: -9 },
      { note: 51, key: "sso_vibe_ds3", tune: -10 },
      { note: 54, key: "sso_vibe_fs3", tune: -11 },
      { note: 57, key: "sso_vibe_a3", tune: -10 },
      { note: 60, key: "sso_vibe_c4", tune: -10 },
      { note: 64, key: "sso_vibe_e4", tune: -11 },
      { note: 66, key: "sso_vibe_fs4", tune: -10 },
      { note: 69, key: "sso_vibe_a4", tune: -10 },
      { note: 72, key: "sso_vibe_c5", tune: -10 },
      { note: 75, key: "sso_vibe_ds5", tune: -10 },
      { note: 78, key: "sso_vibe_fs5", tune: -9 },
      { note: 81, key: "sso_vibe_a5", tune: -10 }
    ];
    const MS_HARPSICHORD = [
      { note: 32, key: "sso_harpsi_gs0", tune: 2 },
      { note: 36, key: "sso_harpsi_c1", tune: 1 },
      { note: 46, key: "sso_harpsi_as1", tune: 2 },
      { note: 50, key: "sso_harpsi_d2", tune: 1 },
      { note: 64, key: "sso_harpsi_e3", tune: 5 },
      { note: 73, key: "sso_harpsi_cs4", tune: 3 },
      { note: 76, key: "sso_harpsi_e4", tune: 2 },
      { note: 78, key: "sso_harpsi_fs4", tune: 1 },
      { note: 80, key: "sso_harpsi_gs5", tune: 6 }
    ];
    const MS_MARIMBA = [
      { note: 36, key: "sso_marimba_c2", tune: 7 },
      { note: 42, key: "sso_marimba_fs2", tune: -4 },
      { note: 48, key: "sso_marimba_c3", tune: -5 },
      { note: 54, key: "sso_marimba_fs3", tune: -7 },
      { note: 60, key: "sso_marimba_c4", tune: -13 },
      { note: 66, key: "sso_marimba_fs4", tune: -11 },
      { note: 72, key: "sso_marimba_c5", tune: -17 },
      { note: 78, key: "sso_marimba_fs5", tune: -13 },
      { note: 84, key: "sso_marimba_c6", tune: -15 }
    ];
    const MS_CELESTA = [
      { note: 60, key: "sso_celeste_c4", tune: -9 },
      { note: 64, key: "sso_celeste_e4", tune: 6 },
      { note: 68, key: "sso_celeste_gs4", tune: 3 },
      { note: 84, key: "sso_celeste_c6", tune: -4 },
      { note: 88, key: "sso_celeste_e6", tune: -5 },
      { note: 92, key: "sso_celeste_gs6", tune: -28 }
    ];
    const MS_XYLO = [
      { note: 67, key: "vsco_xylo_g3", tune: -11 },
      { note: 72, key: "vsco_xylo_c4", tune: -11 },
      { note: 79, key: "vsco_xylo_g4", tune: -13 },
      { note: 84, key: "vsco_xylo_c5", tune: -15 },
      { note: 91, key: "vsco_xylo_g5", tune: -16 },
      { note: 96, key: "vsco_xylo_c6", tune: -17 },
      { note: 103, key: "vsco_xylo_g6", tune: -19 },
      { note: 108, key: "vsco_xylo_c7", tune: -16 }
    ];
    const MS_GLOCK = [
      { note: 79, key: "vsco_glock_g4", tune: -8 },
      { note: 84, key: "vsco_glock_c5", tune: -12 },
      { note: 91, key: "vsco_glock_g5", tune: -12 },
      { note: 96, key: "vsco_glock_c6", tune: -16 },
      { note: 103, key: "vsco_glock_g6", tune: -16 },
      { note: 108, key: "vsco_glock_c7", tune: -24 }
    ];
    const MS_TIMPANI = [
      { note: 36, key: "hq_tmp_c1", tune: 35 },
      { note: 41, key: "vsco_tmp_1", tune: -77 },
      { note: 42, key: "hq_tmp_fs1", tune: 81 },
      { note: 47, key: "vsco_tmp_2", tune: 52 },
      { note: 48, key: "hq_tmp_c2", tune: -77 }
    ];

    function findClosestSample(msList, targetMidi, fallbackKey) {
      if (!msList || msList.length === 0) return { key: fallbackKey, baseNote: 60 };
      let best = msList[0];
      let minDiff = Math.abs(targetMidi - best.note);
      for (let i = 1; i < msList.length; i++) {
        const diff = Math.abs(targetMidi - msList[i].note);
        if (diff < minDiff) {
          minDiff = diff;
          best = msList[i];
        }
      }
      return { key: hasK250Sample(best.key) ? best.key : fallbackKey, baseNote: best.note, tune: best.tune || 0 };
    }

    function playVoiceByType(type, midiNote, velocity, p) {
      const effMidi = midiNote + ((p.oct || 0) * 12);
      const pUpper = ((p && p.name) || "").toUpperCase();
      const isMonoWindBrass = (type === "winds" || type === "brass")
        && !pUpper.includes("SECTION") && !pUpper.includes("ENSEMBLE")
        && !pUpper.includes("OCTAVE") && !pUpper.includes("FANFARE")
        && !pUpper.includes("STAB") && !pUpper.includes("BRASS");
      if (isMonoWindBrass && p) {
        const busPrefix = (typeof window.__scopedActiveKey === "string") ? window.__scopedActiveKey.split(":")[0] : "live";
        const monoKey = busPrefix + ":" + p.id;
        window.__currentMonoKey = monoKey;
        const pool = engineVoicePools["k250"] || [];
        const nowT = audioCtx ? audioCtx.currentTime : 0;
        for (let vi = pool.length - 1; vi >= 0; vi--) {
          const pv = pool[vi];
          if (pv && pv._monoKey === monoKey && !pv.isReleased) {
            pv.releaseTime = Math.min(pv.releaseTime || 0.08, 0.018);
            pv.release(nowT);
          }
        }
      } else {
        window.__currentMonoKey = null;
      }

      // 1. Acoustic Concert Pianos (20-Zone Stereo Salamander Concert Grand w/ 7.2s Singing Sustain + Damper Pedal)
      if (type === "piano") {
        const sampleInfo = findClosestSample(MS_STEINWAY, effMidi, "sal_c4");
        const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
        const hiTame = effMidi >= 79 ? 0.82 : (effMidi >= 72 ? 0.92 : 1.00);
        const pCut = effMidi >= 76 ? 10500 : (p.cut || 15500);
        playSamplerVoice({
          key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * hiTame,
          attack: Math.max(0.004, Math.min(0.006, p.att || 0.004)), decay: Math.max(p.dec || 7.2, 6.8),
          cutoff: pCut, filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
          canLoop: false, naturalSustain: true, allowPedal: true, releaseTime: 0.58
        });

      // 2. Lush Stereo Symphonic Strings (VSCO-2-CE Stereo Vibrato Sections + L/R Ensemble Spread)
      } else if (type === "strings") {
        const pName = (p && p.name) || "";
        let zoneTable = MS_GRAND_STRINGS;
        let canLoop = true;
        let stereoEns = true;
        let atk = Math.min(0.11, Math.max(0.048, p.att || 0.065));
        let rel = 0.48;
        let velMul = 0.92;
        let strCut = 6800;
        if (pName.includes("PIZZICATO")) {
          zoneTable = MS_VIOLIN_PIZ; canLoop = false; stereoEns = false; atk = 0.002; rel = 0.22; velMul = 1.08; strCut = 12000;
        } else if (pName.includes("STACCATO") || pName.includes("SPICCATO") || pName.includes("MARCATO")) {
          zoneTable = MS_VIOLIN_STC; canLoop = false; stereoEns = false; atk = 0.004; rel = 0.16; velMul = 1.10; strCut = 11500;
        } else if (pName.includes("CONTRABASS") || pName.includes("BASSES")) {
          zoneTable = MS_BASS_SUS; rel = 0.48; velMul = 1.08; strCut = 5200;
        } else if (pName.includes("CELLO")) {
          zoneTable = MS_CELLO_SUS; rel = 0.44; velMul = 0.96; strCut = 6200;
        } else if (pName.includes("VIOLA")) {
          zoneTable = MS_VIOLA_SUS; rel = 0.42; velMul = 0.94; strCut = 6400;
        } else if (pName.includes("SOLO VIOLIN")) {
          zoneTable = MS_VIOLIN_SUS; stereoEns = false; atk = 0.036; rel = 0.36; velMul = 0.94; strCut = 7600;
        } else if (pName.includes("VIOLIN") || pName.includes("CHAMBER") || pName.includes("QUARTET")) {
          zoneTable = MS_VIOLIN_SUS; rel = 0.42; velMul = 0.94; strCut = 6800;
        } else if (pName.includes("SFORZANDO") || pName.includes("ADAGIO")) {
          atk = Math.max(0.07, Math.min(0.18, p.att || 0.10)); rel = 0.50;
        }
        const sampleInfo = findClosestSample(zoneTable, effMidi, "strings_swell");
        if (hasK250Sample(sampleInfo.key)) {
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * velMul,
            attack: atk, decay: Math.max(p.dec || 5.4, 5.2), cutoff: Math.min(strCut, p.cut || strCut),
            filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
            vibratoRate: p.vibR || 0, vibratoDepth: p.vibD || 0,
            canLoop, sustainHold: canLoop, naturalSustain: !canLoop, stereoEnsemble: stereoEns, releaseTime: rel
          });
        } else {
          playK250StringVoice(midiNote, effMidi, velocity, p);
        }

      // 3. Acoustic Brass & French Horn Sections (Chromatic FluidR3 Trumpet/Trombone/Tuba + Warm Dynamic Lip Envelope + Crisp Staccato)
      } else if (type === "horns") {
        const pName = (p && p.name) || "";
        const isTuba = pName.includes("TUBA") || p.id === 112 || p.id === 133;
        const isHarmon = pName.includes("HARMON") || pName.includes("MILES") || pName.includes("CUP MUTED") || p.id === 108 || p.id === 109;
        const isStab = pName.includes("STAB") || pName.includes("TIGHT") || pName.includes("HIT") || p.id === 115 || p.id === 116 || p.id === 118 || p.id === 130;
        const isTrombone = !isTuba && (pName.includes("TROMBONE") || pName.includes("EUPHONIUM") || pName.includes("BRASS SECTION") || p.id === 110 || p.id === 111 || p.id === 128);
        const isJazzTpt = !isTrombone && (pName.includes("CUP") || pName.includes("FLUGEL") || pName.includes("JAZZ") || p.id === 109 || p.id === 113);
        const isTpt = !isTrombone && (pName.includes("TRUMPET") || pName.includes("CORNET") || pName.includes("FANFARE") || pName.includes("CLARION"));
        let zoneTable = MS_FRHORN;
        let velMul = 1.12;
        let cutHold = 4400;
        let cutSweep = 0;
        let rel = 0.13;
        let atk = Math.min(0.012, Math.max(0.004, p.att || 0.007));
        if (isStab && typeof MS_BRASS_STAC !== "undefined") {
          zoneTable = MS_BRASS_STAC; velMul = 1.00; cutHold = 10500; cutSweep = 0; rel = 0.095; atk = 0.002;
        } else if (isTuba && typeof MS_TUBA !== "undefined") {
          zoneTable = MS_TUBA; velMul = 1.22; cutHold = 3600; cutSweep = 0; rel = 0.14;
        } else if (isHarmon) {
          zoneTable = MS_TRUMPET_HARMON; velMul = 1.04; cutHold = 7800; cutSweep = 0; rel = 0.14;
        } else if (isJazzTpt) {
          zoneTable = MS_TRUMPET_VIB; velMul = 1.06; cutHold = 8600; cutSweep = 0; rel = 0.14;
        } else if (isTrombone) {
          zoneTable = MS_TROMBONE; velMul = 1.10; cutHold = 4800; cutSweep = 0; rel = 0.12;
        } else if (isTpt) {
          zoneTable = MS_TRUMPET; velMul = 0.98; cutHold = 8800; cutSweep = 0; rel = 0.11;
        }
        const sampleInfo = findClosestSample(zoneTable, effMidi, zoneTable[0].key);
        const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
        playSamplerVoice({
          key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * velMul,
          attack: atk, decay: isStab ? 0.55 : Math.max(p.dec || 3.8, 3.4),
          cutoff: Math.min(cutHold, p.cut || cutHold), brassSweepHz: cutSweep,
          filterType: "lowpass", res: 0.60, detune: (p.det || 0) + (sampleInfo.tune || 0),
          vibratoRate: p.vibR, vibratoDepth: p.vibD,
          canLoop: !isStab, sustainHold: !isStab, naturalSustain: isStab, releaseTime: rel
        });

      // 4. Woodwinds & Reeds (Real Multi-Sampled Flutes, Oboes, Clarinets, Bassoons, Saxophones)
      } else if (type === "winds") {
        const pName = (p && p.name) || "";
        const isSax = pName.includes("SAX") || (p.id >= 150 && p.id <= 154);
        if (isSax) {
          const sampleInfo = findClosestSample(MS_SAX, effMidi, "weresax_d3");
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.02,
            attack: 0.022, decay: 5.2, cutoff: 5200, filterType: "lowpass", res: 0.65,
            detune: (p.det || 0) + (sampleInfo.tune || 0),
            vibratoRate: p.vibR || 5.2, vibratoDepth: p.vibD || 11, vibratoDelay: 0.24,
            canLoop: false, naturalSustain: true, releaseTime: 0.28
          });
        } else {
          let zoneTable = MS_FLUTE;
          let fallback = "vsco_flt_c4";
          if (pName.includes("PICCOLO") || pName.includes("WHISTLE") || p.id === 138 || p.id === 149 || p.id === 157) {
            zoneTable = MS_PICCOLO; fallback = "vsco_picc_c5";
          } else if (pName.includes("OBOE") || pName.includes("ENGLISH") || pName.includes("BAGPIPE")) {
            zoneTable = MS_OBOE; fallback = "vsco_obo_d4";
          } else if (pName.includes("CLARINET")) {
            zoneTable = MS_CLARINET; fallback = "vsco_clar_d4";
          } else if (pName.includes("BASSOON")) {
            zoneTable = MS_BASSOON; fallback = "sso_bsn_sus_e3";
          }
          const sampleInfo = findClosestSample(zoneTable, effMidi, fallback);
          if (hasK250Sample(sampleInfo.key)) {
            const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
            playSamplerVoice({
              key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 0.96,
              attack: Math.min(0.016, Math.max(0.006, p.att || 0.012)), decay: Math.max(p.dec || 4.4, 4.2),
              cutoff: p.cut || 15000, filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
              vibratoRate: p.vibR || 0, vibratoDepth: p.vibD || 0,
              canLoop: true, sustainHold: true, releaseTime: 0.36
            });
          } else {
            playWoodwindSynth(midiNote, effMidi, velocity, p);
          }
        }

      // 5. Tonewheel & Pipe Organs
      } else if (type === "b3") {
        const isPipe = p.name.includes("PIPE") || p.name.includes("CATHEDRAL") || p.name.includes("CHURCH") || p.name.includes("BAROQUE") || p.name.includes("GOTHIC");
        const isRockDist = p.name.includes("ROCK") || p.name.includes("DIST") || p.name.includes("LORD") || p.name.includes("HEAVY");
        if (isPipe) {
          const sampleInfo = findClosestSample(MS_PIPE, effMidi, "vsco_organ_25");
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity,
            attack: p.att, decay: Math.max(p.dec || 4.0, 3.8), cutoff: p.cut || 15000, filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
            vibratoRate: p.vibR, vibratoDepth: p.vibD,
            canLoop: true, sustainHold: true, releaseTime: 0.24
          });
        } else if (isRockDist) {
          const sampleInfo = findClosestSample(MS_B3, effMidi, "b3dist_distb3_c3");
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 0.85,
            attack: p.att, decay: p.dec, cutoff: p.cut, filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
            vibratoRate: p.vibR, vibratoDepth: p.vibD,
            canLoop: true, sustainHold: true, releaseTime: 0.14
          });
          playHammondB3Voice(midiNote, effMidi, velocity * 0.45, p);
        } else {
          playHammondB3Voice(midiNote, effMidi, velocity, p);
        }

      // 6. Electric Pianos (1977 Stereo Rhodes MK I Stage 73)
      } else if (type === "ep") {
        const sampleInfo = findClosestSample(MS_EP, effMidi, "jrhodes_50");
        const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
        playSamplerVoice({
          key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.06,
          attack: 0.003, decay: Math.max(p.dec || 3.4, 3.2), cutoff: p.cut || 15000, filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
          vibratoRate: p.vibR, vibratoDepth: p.vibD,
          canLoop: false, naturalSustain: true, allowPedal: true, releaseTime: 0.36
        });

      // 7. Funky Clavinets & Acoustic Concert Harp
      } else if (type === "clav") {
        if (p.name && p.name.includes("HARP")) {
          const sampleInfo = findClosestSample(MS_HARP, effMidi, "sso_hrp_c4");
          if (hasK250Sample(sampleInfo.key)) {
            const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
            playSamplerVoice({
              key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 0.98,
              attack: 0.002, decay: Math.max(p.dec || 3.4, 3.0), cutoff: 16000,
              detune: (p.det || 0) + (sampleInfo.tune || 0), canLoop: false, releaseTime: 0.35
            });
          } else {
            playHarpVoice(midiNote, effMidi, velocity, p);
          }
          return;
        }
        const sampleInfo = findClosestSample(MS_CLAV, effMidi, "clav_clavinet_2_f5");
        const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
        playSamplerVoice({
          key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity,
          attack: p.att, decay: Math.max(p.dec || 1.2, 1.0), cutoff: p.cut, filterType: p.filt, res: p.res, detune: (p.det || 0) + (sampleInfo.tune || 0),
          canLoop: false, naturalSustain: true, releaseTime: 0.14
        });

      // 8. Classical & Electric Guitars (Nylon, Steel, Strat, 12-String, Lead)
      } else if (type === "guitar") {
        let gTable = MS_GTR_FULL;
        const isJazzGtr = p.name.includes("JAZZ") || p.id === 189;
        const isAcGtr = p.id === 185 || p.id === 186 || p.id === 187 || p.name.includes("NYLON") || p.name.includes("CLASSICAL");
        const isDist = p.name.includes("OVERDRIVEN") || p.name.includes("DISTORTED") || p.id === 191 || p.id === 192;
        if (isJazzGtr && typeof MS_GTR_JAZZ !== "undefined") gTable = MS_GTR_JAZZ;
        else if (isAcGtr && typeof MS_GTR_ACOUSTIC !== "undefined") gTable = MS_GTR_ACOUSTIC;
        else if ((p.name.includes("STRAT") || p.id === 188 || p.id === 193) && typeof MS_GTR_FULL !== "undefined") gTable = MS_GTR_FULL;
        else if ((isDist || p.name.includes("ROCK")) && typeof MS_GTR_ELECTRIC !== "undefined") gTable = MS_GTR_ELECTRIC;
        else if (p.name.includes("HARM") || p.id === 194) gTable = MS_GTR_HARM;
        else if (p.name.includes("MUTED") || p.id === 190) gTable = MS_GTR_MUTE;

        const sampleInfo = findClosestSample(gTable, effMidi, gTable[0].key);
        const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
        const isRockLead = p.name.includes("OVERDRIVEN") || p.id === 191;

        playSamplerVoice({
          key: sampleInfo.key,
          midiNote,
          pitchRatio: ratio,
          velocity: isDist ? velocity * 0.72 : (isJazzGtr ? velocity * 0.98 : velocity * 0.98),
          attack: isJazzGtr ? 0.004 : (p.att || 0.004),
          decay: isDist ? 3.8 : (isJazzGtr ? 4.8 : Math.max(p.dec || 3.2, 3.0)),
          cutoff: isDist ? 6200 : (isJazzGtr ? 5400 : (p.cut || 13000)),
          filterType: "lowpass",
          res: isDist ? 1.4 : (isJazzGtr ? 0.55 : (p.res || 1.2)),
          detune: (p.name.includes("12-STRING") ? 4 : (p.det || 0)) + (sampleInfo.tune || 0),
          vibratoRate: isRockLead ? 5.4 : (isJazzGtr ? 4.6 : 0),
          vibratoDepth: isRockLead ? 12 : (isJazzGtr ? 5 : 0),
          vibratoDelay: isRockLead ? 0.22 : (isJazzGtr ? 0.38 : 0),
          canLoop: false,
          naturalSustain: true,
          jazzGuitarFx: isJazzGtr,
          rockDistFx: isDist,
          releaseTime: isDist ? 0.22 : (isJazzGtr ? 0.42 : 0.16)
        });

        // 12-String Shimmer Octave Layer
        if (p.name.includes("12-STRING") || p.id === 187 || p.id === 193) {
          playSamplerVoice({
            key: sampleInfo.key,
            midiNote,
            pitchRatio: ratio * 2.0,
            velocity: velocity * 0.85,
            attack: 0.005,
            decay: 2.2,
            cutoff: 14000,
            detune: -5 + (sampleInfo.tune || 0),
            canLoop: false,
            naturalSustain: true,
            releaseTime: 0.16
          });
        }

      // 9. Upright, Electric, Fretless, Slap & Synth Basses (Real Sampled Upright Double Bass Pizzicato)
      } else if (type === "bass") {
        const pName = (p && p.name) || "";
        const isAcousticUpright = pName.includes("UPRIGHT") || p.id === 195 || p.id === 201 || p.id === 208;
        if (isAcousticUpright && hasK250Sample("f3r_abass_c2")) {
          const sampleInfo = findClosestSample(MS_UPRIGHT_BASS, effMidi, "f3r_abass_c2");
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.18,
            attack: 0.002, decay: Math.max(p.dec || 2.5, 2.4), cutoff: 5800,
            detune: (p.det || 0) + (sampleInfo.tune || 0),
            canLoop: false, naturalSustain: true, releaseTime: 0.26
          });
        } else if ((p.id >= 196 && p.id <= 200) || p.id === 206) {
          const bMidi = effMidi + 12;
          const sampleInfo = findClosestSample(MS_GTR_ELECTRIC, bMidi, "bg_el_e3");
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          const isSlap = pName.includes("SLAP") || pName.includes("POP");
          const isFretless = pName.includes("FRETLESS");
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.15,
            attack: isFretless ? 0.018 : 0.002, decay: Math.max(p.dec || 2.8, 2.4),
            cutoff: isSlap ? 7200 : (isFretless ? 3200 : 4200), res: isSlap ? 2.4 : (isFretless ? 2.0 : 1.0),
            detune: (p.det || 0) + (sampleInfo.tune || 0),
            vibratoRate: isFretless ? 4.8 : 0, vibratoDepth: isFretless ? 7 : 0,
            canLoop: false, naturalSustain: true, releaseTime: 0.24
          });
        } else {
          playAuthenticBassVoice(midiNote, effMidi, velocity, p);
        }

      // 10. Choirs & Vocal Ensembles
      } else if (type === "choir") {
        const cKey = hasK250Sample("k2000_mixed_choir_c4") ? "k2000_mixed_choir_c4" : "choir_pad";
        const ratio = Math.pow(2, (effMidi - 60) / 12);
        playSamplerVoice({
          key: cKey, midiNote, pitchRatio: ratio, velocity: velocity * 0.95,
          attack: Math.min(p.att || 0.04, 0.03), decay: Math.max(p.dec || 4.2, 3.8), cutoff: p.cut || 12000, filterType: p.filt, res: p.res, detune: p.det,
          vibratoRate: p.vibR || 4.5, vibratoDepth: p.vibD || 4,
          canLoop: true, sustainHold: true, releaseTime: 0.35
        });

      // 11. Tuned Mallets (Marimba, Vibraphone, Xylophone, Glockenspiel, Celesta, Bells)
      } else if (type === "mallet") {
        const pName = (p && p.name) || "";
        let mTbl = null;
        if ((p.id === 213 || pName.includes("VIBRAPHONE")) && hasK250Sample("sso_vibe_c4")) mTbl = MS_VIBES;
        else if ((p.id === 212 || p.id === 217 || pName.includes("MARIMBA") || pName.includes("BALAFON")) && typeof MS_MARIMBA !== "undefined" && MS_MARIMBA.length && hasK250Sample(MS_MARIMBA[0].key)) mTbl = MS_MARIMBA;
        else if ((p.id === 16 || p.id === 18 || pName.includes("CELESTA")) && typeof MS_CELESTA !== "undefined" && MS_CELESTA.length && hasK250Sample(MS_CELESTA[0].key)) mTbl = MS_CELESTA;
        else if ((p.id === 214 || pName.includes("XYLOPHONE")) && typeof MS_XYLO !== "undefined" && MS_XYLO.length && hasK250Sample(MS_XYLO[0].key)) mTbl = MS_XYLO;
        else if ((p.id === 215 || p.id === 216 || pName.includes("GLOCKENSPIEL") || pName.includes("CROTALES")) && typeof MS_GLOCK !== "undefined" && MS_GLOCK.length && hasK250Sample(MS_GLOCK[0].key)) mTbl = MS_GLOCK;
        if (mTbl) {
          const sampleInfo = findClosestSample(mTbl, effMidi, mTbl[0].key);
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          const isVibes = (p.id === 213 || pName.includes("VIBRAPHONE"));
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * (isVibes ? 1.04 : 0.94),
            attack: 0.004, decay: 5.6, cutoff: 12000,
            detune: (p.det || 0) + (sampleInfo.tune || 0),
            vibratoRate: isVibes ? 5.2 : 0, vibratoDepth: isVibes ? 6 : 0, vibratoDelay: isVibes ? 0.16 : 0,
            canLoop: false, naturalSustain: true, releaseTime: 0.36
          });
        } else {
          playMalletSynth(midiNote, effMidi, velocity, p);
        }

      // 12. Classical Harpsichord (Real Multi-Sampled Stereo Acoustic Harpsichord)
      } else if (type === "harpsichord") {
        if (typeof MS_HARPSICHORD !== "undefined" && MS_HARPSICHORD.length && hasK250Sample(MS_HARPSICHORD[0].key)) {
          const sampleInfo = findClosestSample(MS_HARPSICHORD, effMidi, MS_HARPSICHORD[0].key);
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.02,
            attack: 0.002, decay: 3.4, cutoff: p.cut || 14500, detune: (p.det || 0) + (sampleInfo.tune || 0),
            canLoop: false, naturalSustain: true, releaseTime: 0.24
          });
        } else {
          playHarpsichordVoice(midiNote, effMidi, velocity, p);
        }

      // 13. Concert Timpani & Orchestral Gongs
      } else if (type === "timpani") {
        const isGong = p.name.includes("GONG") || p.name.includes("TAM");
        if (isGong) {
          const gKey = hasK250Sample("orch_gong") ? "orch_gong" : "k2k_gong";
          playSamplerVoice({
            key: gKey, midiNote, pitchRatio: 1.0, velocity: velocity * 1.15,
            attack: p.att, decay: p.dec || 4.5, cutoff: p.cut || 9000, filterType: p.filt, res: p.res, detune: p.det,
            canLoop: false, releaseTime: 0.35
          });
        } else {
          const sampleInfo = findClosestSample(MS_TIMPANI, effMidi, "hq_tmp_c1");
          const ratio = Math.pow(2, (effMidi - sampleInfo.baseNote) / 12);
          const timpHz = 440 * Math.pow(2, (effMidi - 69) / 12);
          playSamplerVoice({
            key: sampleInfo.key, midiNote, pitchRatio: ratio, velocity: velocity * 1.06,
            attack: 0.002, decay: Math.max(p.dec || 4.6, 4.6), cutoff: p.cut || 11000, filterType: p.filt, res: p.res,
            detune: (p.det || 0) + (sampleInfo.tune || 0),
            canLoop: false, naturalSustain: true,
            subBodyFreq: Math.max(42, Math.min(180, timpHz)), subBodyLevel: 0.30,
            releaseTime: 1.65
          });
        }

      // 14. Acoustic Drums, TR-808, TR-909 & Percussion Sets
      } else if (type === "drums") {
        if (p.id === 238 || (p.name.includes("808") && p.name.includes("KIT"))) {
          play808Drum(effMidi, velocity);
          return;
        }
        playAcousticDrumKitVoice(midiNote, effMidi, velocity, p);

      } else if (type === "fm") {
        playFmSynth(effMidi, velocity, midiNote);
      } else if (type === "303") {
        play303Bass(effMidi, velocity, midiNote);
      }
    }

    
    // =========================================================================
    // DEDICATED ACOUSTIC SOUND ENGINES (Hammond B3, Woodwinds, Basses, Mallets, Harpsichord)
    // =========================================================================

    // 0. Authentic Hammond B3 9-Drawbar Tonewheel & Rotary Leslie Organ Engine
    function playHammondB3Voice(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const freq = 440 * Math.pow(2, (effMidi - 69) / 12);
      const isHeld = (typeof physicallyHeldKeys !== "undefined" && physicallyHeldKeys.has(midiNote)) || (typeof isSustainPedalDown !== "undefined" && isSustainPedalDown);
      const heldDecay = isHeld ? Math.max(12.0, (p.dec || 3.5) * 3.5) : (p.dec || 3.5);
      const name = p.name || "";

      // Drawbar Harmonic Ratios: 16'(0.5), 5-1/3'(1.5), 8'(1.0), 4'(2.0), 2-2/3'(3.0), 2'(4.0), 1-3/5'(5.0), 1-1/3'(6.0), 1'(8.0)
      const ratios = [1.0, 2.0, 1.5, 3.0, 4.0, 0.5, 5.0, 6.0, 8.0];
      let weights = [0.42, 0.28, 0.22, 0.14, 0.10, 0.26, 0.05, 0.04, 0.03]; // Balanced Warm B3 (888400000)

      if (name.includes("GOSPEL") || name.includes("FULL")) {
        weights = [0.40, 0.34, 0.30, 0.24, 0.22, 0.32, 0.14, 0.12, 0.12];
      } else if (name.includes("JIMMY") || name.includes("JAZZ")) {
        weights = [0.45, 0.30, 0.35, 0.08, 0.04, 0.30, 0.02, 0.0, 0.0];
      } else if (name.includes("MELLOW") || name.includes("BALLAD") || name.includes("PAD")) {
        weights = [0.48, 0.22, 0.10, 0.12, 0.04, 0.28, 0.0, 0.0, 0.0];
      } else if (name.includes("FARFISA") || name.includes("VOX")) {
        weights = [0.38, 0.30, 0.15, 0.26, 0.20, 0.12, 0.16, 0.10, 0.08];
      } else if (name.includes("ACCORDION") || name.includes("BANDONEON") || name.includes("HARMONICA") || name.includes("REED")) {
        weights = [0.40, 0.28, 0.16, 0.22, 0.14, 0.18, 0.10, 0.06, 0.04];
      }

      const masterVoiceGain = audioCtx.createGain();
      const att = Math.min(0.05, p.att || 0.008);
      masterVoiceGain.gain.setValueAtTime(0.0001, t0);
      masterVoiceGain.gain.linearRampToValueAtTime(0.45 * velocity, t0 + att);
      if (isHeld) {
        masterVoiceGain.gain.linearRampToValueAtTime(0.40 * velocity, t0 + heldDecay);
        masterVoiceGain.gain.exponentialRampToValueAtTime(0.0001, t0 + heldDecay + 0.5);
      } else {
        masterVoiceGain.gain.exponentialRampToValueAtTime(0.32 * velocity, t0 + heldDecay * 0.75);
        masterVoiceGain.gain.exponentialRampToValueAtTime(0.0001, t0 + heldDecay);
      }

      const voiceFilter = audioCtx.createBiquadFilter();
      voiceFilter.type = "lowpass";
      voiceFilter.frequency.setValueAtTime(p.cut || 8500, t0);
      voiceFilter.Q.setValueAtTime(p.res || 1.1, t0);

      masterVoiceGain.connect(voiceFilter);
      voiceFilter.connect(getTrackBusNode(3));

      // Leslie Rotary Vibrato LFO
      const rotaryRate = name.includes("FAST") ? 6.4 : (name.includes("SLOW") ? 0.9 : 5.2);
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(rotaryRate, t0);
      lfoGain.gain.setValueAtTime(name.includes("MUSETTE") ? 14 : 6.5, t0);
      lfo.connect(lfoGain);
      lfo.start(t0);
      lfo.stop(t0 + heldDecay + 0.6);

      const oscs = [];
      ratios.forEach((r, idx) => {
        const w = weights[idx];
        if (w <= 0.001) return;
        const oscFreq = freq * r;
        if (oscFreq > 15000) return;
        const osc = audioCtx.createOscillator();
        osc.type = (name.includes("ACCORDION") || name.includes("HARMONICA")) && idx < 2 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(oscFreq, t0);
        if (p.det) osc.detune.setValueAtTime(p.det, t0);
        lfoGain.connect(osc.detune);

        const hg = audioCtx.createGain();
        hg.gain.setValueAtTime(w * 0.45, t0);
        osc.connect(hg);
        hg.connect(masterVoiceGain);
        osc.start(t0);
        osc.stop(t0 + heldDecay + 0.6);
        oscs.push(osc);
      });

      // B3 Key-Click & 2nd/3rd Harmonic Percussion Transient
      if (name.includes("2ND") || name.includes("3RD") || name.includes("PERC") || name.includes("B3")) {
        const percRatio = name.includes("3RD") ? 3.0 : 2.0;
        const percOsc = audioCtx.createOscillator();
        const percGain = audioCtx.createGain();
        percOsc.type = "sine";
        percOsc.frequency.setValueAtTime(freq * percRatio, t0);
        percGain.gain.setValueAtTime(0.22 * velocity, t0);
        percGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
        percOsc.connect(percGain);
        percGain.connect(voiceFilter);
        percOsc.start(t0);
        percOsc.stop(t0 + 0.18);
        oscs.push(percOsc);
      }

      const voice = new ActiveVoice({
        note: midiNote,
        src: oscs,
        gain: masterVoiceGain,
        filter: voiceFilter,
        lfo,
        stopTime: t0 + heldDecay + 0.6,
        releaseTime: 0.10
      });
      registerActiveVoice(midiNote, voice, heldDecay + 0.8);
    }

    // 1. Woodwind Physical Model (Flute, Piccolo, Oboe, Clarinet, Bassoon)
    // 1. Acoustic Woodwind Model (Warm Concert Flute, Piccolo, Pastoral Oboe, Clarinet, Bassoon)
    function playWoodwindSynth(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const freq = 440 * Math.pow(2, (effMidi - 69) / 12);
      const isFlute = p.name.includes("FLUTE") || p.name.includes("PICCOLO") || p.name.includes("PAN") || p.name.includes("RECORDER");
      const isDoubleReed = p.name.includes("OBOE") || p.name.includes("BASSOON") || p.name.includes("ENGLISH");
      const isHeld = (typeof physicallyHeldKeys !== "undefined" && physicallyHeldKeys.has(midiNote)) || (typeof isSustainPedalDown !== "undefined" && isSustainPedalDown);

      // Gentle breath onset transient (subtle airy chiff, never harsh noise)
      const bufSize = Math.floor(audioCtx.sampleRate * 0.045);
      const noiseBuf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
      const output = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.35));

      const noiseSrc = audioCtx.createBufferSource();
      noiseSrc.buffer = noiseBuf;
      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(isFlute ? 1900 : 1250, t0);
      noiseFilter.Q.setValueAtTime(2.6, t0);
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime((isFlute ? 0.022 : 0.012) * velocity, t0);
      noiseGain.gain.exponentialRampToValueAtTime(0.0005, t0 + 0.045);

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(getTrackBusNode(3));
      noiseSrc.start(t0);

      // Warm Acoustic Body Oscillators (blended triangle+sine base, gentle double-reed harmonic color)
      const osc1 = audioCtx.createOscillator();
      osc1.type = isFlute ? "sine" : "triangle";
      osc1.frequency.setValueAtTime(freq, t0);

      const osc2 = audioCtx.createOscillator();
      osc2.type = isDoubleReed ? "sawtooth" : "sine";
      osc2.frequency.setValueAtTime(isDoubleReed ? freq : freq * 2.0, t0);

      const g1 = audioCtx.createGain();
      const g2 = audioCtx.createGain();
      g1.gain.setValueAtTime(isFlute ? 0.86 : (isDoubleReed ? 0.62 : 0.78), t0);
      g2.gain.setValueAtTime(isFlute ? 0.14 : (isDoubleReed ? 0.24 : 0.20), t0);

      // Subtle classical vibrato after warm expressive onset
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(4.9, t0);
      lfoGain.gain.setValueAtTime(0, t0);
      lfoGain.gain.setValueAtTime(0, t0 + 0.16);
      lfoGain.gain.linearRampToValueAtTime(freq * 0.007, t0 + 0.55); // Gentle 0.7% vibrato
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);
      lfo.start(t0);

      const formantFilter = audioCtx.createBiquadFilter();
      formantFilter.type = "peaking";
      formantFilter.frequency.setValueAtTime(isDoubleReed ? 1150 : (isFlute ? 950 : 1050), t0);
      formantFilter.Q.setValueAtTime(1.4, t0);
      formantFilter.gain.setValueAtTime(isDoubleReed ? 4.2 : 1.5, t0);

      const bodyFilter = audioCtx.createBiquadFilter();
      bodyFilter.type = "lowpass";
      bodyFilter.frequency.setValueAtTime(isFlute ? 4200 : (isDoubleReed ? 2750 : 3400), t0);
      bodyFilter.Q.setValueAtTime(0.8, t0);

      const voiceGain = audioCtx.createGain();
      const att = Math.max(0.032, p.att || (isFlute ? 0.045 : 0.038));
      const dec = isHeld ? Math.max(10.0, (p.dec || 2.0) * 3.5) : (p.dec || 2.0);
      voiceGain.gain.setValueAtTime(0.0008, t0);
      voiceGain.gain.linearRampToValueAtTime(0.24 * velocity, t0 + att);
      voiceGain.gain.exponentialRampToValueAtTime(0.0008, t0 + dec);

      osc1.connect(g1);
      osc2.connect(g2);
      g1.connect(formantFilter);
      g2.connect(formantFilter);
      formantFilter.connect(bodyFilter);
      bodyFilter.connect(voiceGain);
      voiceGain.connect(getTrackBusNode(3));

      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(t0 + dec + 0.12);
      osc2.stop(t0 + dec + 0.12);
      lfo.stop(t0 + dec + 0.12);

      const voice = new ActiveVoice({
        note: midiNote,
        src: [osc1, osc2],
        gain: voiceGain,
        filter: bodyFilter,
        lfo,
        stopTime: t0 + dec + 0.12,
        releaseTime: 0.14
      });
      registerActiveVoice(midiNote, voice, dec + 0.25);
    }

    // 2. Authentic Bass Engine (Upright, Electric, Slap, Fretless, Moog)
    function playAuthenticBassVoice(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const freq = 440 * Math.pow(2, (effMidi - 69) / 12);
      const isUpright = p.name.includes("UPRIGHT") || p.id === 195 || p.id === 201 || p.id === 208;
      const isSlap = p.name.includes("SLAP") || p.id === 199 || p.id === 200;
      const isFretless = p.name.includes("FRETLESS") || p.id === 198;
      const is808Sub = p.name.includes("808") || p.id === 205;
      const isMoog = p.name.includes("MINIMOOG") || p.name.includes("SYNTH") || p.id === 202 || p.id === 207;

      // Primary Pluck Oscillator
      const osc = audioCtx.createOscillator();
      osc.type = is808Sub ? "sine" : (isMoog ? "sawtooth" : (isUpright ? "triangle" : "sawtooth"));
      if (is808Sub) {
        osc.frequency.setValueAtTime(freq * 2.15, t0);
        osc.frequency.exponentialRampToValueAtTime(freq, t0 + 0.022);
      } else {
        osc.frequency.setValueAtTime(freq, t0);
      }

      // Sub-Bass Oscillator (-1 octave)
      const subOsc = audioCtx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(freq * 0.5, t0);

      // Resonant Lowpass Filter with dynamic pluck envelope
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.setValueAtTime(isSlap ? 3.5 : (isMoog ? 4.0 : 2.0), t0);

      const startCutoff = isSlap ? 4800 : (isMoog ? 3500 : (isUpright ? 1200 : 2500));
      const endCutoff = isUpright ? 150 : 220;
      filter.frequency.setValueAtTime(startCutoff, t0);
      filter.frequency.exponentialRampToValueAtTime(endCutoff, t0 + (isSlap ? 0.35 : 0.45));

      const oscs = [osc, subOsc];
      // Slap Snap High Click
      if (isSlap) {
        const snapOsc = audioCtx.createOscillator();
        const snapGain = audioCtx.createGain();
        snapOsc.type = "triangle";
        snapOsc.frequency.setValueAtTime(freq * 4.0, t0);
        snapGain.gain.setValueAtTime(0.18 * velocity, t0);
        snapGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.04);
        snapOsc.connect(snapGain);
        snapGain.connect(getTrackBusNode(3));
        snapOsc.start(t0);
        snapOsc.stop(t0 + 0.05);
        oscs.push(snapOsc);
      }

      // Fretless Mwah Glide
      if (isFretless) {
        osc.frequency.setValueAtTime(freq * 0.98, t0);
        osc.frequency.linearRampToValueAtTime(freq, t0 + 0.08);
      }

      const voiceGain = audioCtx.createGain();
      const dec = isUpright ? 1.6 : (p.dec || 2.2);
      voiceGain.gain.setValueAtTime(0.38 * velocity, t0);
      voiceGain.gain.exponentialRampToValueAtTime(0.001, t0 + dec);

      const subGain = audioCtx.createGain();
      subGain.gain.setValueAtTime(0.32 * velocity, t0);
      subGain.gain.exponentialRampToValueAtTime(0.001, t0 + dec * 0.9);

      osc.connect(filter);
      subOsc.connect(subGain);
      filter.connect(voiceGain);
      voiceGain.connect(getTrackBusNode(3));
      subGain.connect(getTrackBusNode(3));

      osc.start(t0);
      subOsc.start(t0);
      osc.stop(t0 + dec + 0.1);
      subOsc.stop(t0 + dec + 0.1);

      const voice = new ActiveVoice({
        note: midiNote,
        src: oscs,
        gain: [voiceGain, subGain],
        filter,
        stopTime: t0 + dec + 0.1,
        releaseTime: 0.10
      });
      registerActiveVoice(midiNote, voice, dec + 0.2);
    }

    // 3. Tuned Mallets (Marimba, Vibraphone, Glockenspiel, Celesta, Xylophone, Bells)
    function playMalletSynth(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const freq = 440 * Math.pow(2, (effMidi - 69) / 12);
      const name = p.name || "";

      const isBalafon = name.includes("BALAFON") || p.id === 217;
      const isMarimbaVibes = name.includes("MARIMBA & VIBES") || p.id === 231;
      const isMarimba = !isBalafon && (name.includes("MARIMBA") || p.id === 212);
      const isVibes = name.includes("VIBRAPHONE") || isMarimbaVibes || p.id === 213;
      const isGlock = name.includes("GLOCKENSPIEL") || name.includes("CELESTA") || name.includes("MUSIC BOX") || p.id === 16 || p.id === 18 || p.id === 215;
      const isCrotales = name.includes("CROTALES") || p.id === 216;
      const isXylo = name.includes("XYLOPHONE") || p.id === 214;
      const isSleighBells = name.includes("SLEIGH BELLS") || p.id === 227;
      const isWindChimes = name.includes("WIND CHIMES") || p.id === 228;
      const isTriangle = name.includes("TRIANGLE") || p.id === 226;
      const isImpact = name.includes("IMPACT") || p.id === 232;
      const isKalimba = name.includes("KALIMBA") || p.id === 220;
      const isSteel = name.includes("STEEL DRUM") || p.id === 218;
      const isGamelan = name.includes("GAMELAN") || p.id === 219;
      const isChimes = !isSleighBells && !isWindChimes && (name.includes("CHIMES") || name.includes("TUBULAR") || name.includes("BELLS") || p.id === 211 || p.id === 230);

      const oscs = [];
      const gains = [];
      let vibLfo = null;

      // Special 1: Concert Triangle (k2k_triangle + steel overtone shimmer)
      if (isTriangle) {
        if (hasK250Sample("k2k_triangle")) {
          const ratio = Math.pow(2, Math.max(-5, Math.min(5, (midiNote - 60) * 0.4)) / 12);
          playSamplerVoice({ key: "k2k_triangle", midiNote, pitchRatio: ratio, velocity: velocity * 1.15, attack: 0.001, decay: 2.2, cutoff: 16000, canLoop: false, releaseTime: 0.18 });
        }
        const triPartials = [1.0, 2.58, 4.18, 6.45];
        const baseF = Math.max(1200, freq * 2.0);
        triPartials.forEach((r, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(baseF * r, t0);
          gain.gain.setValueAtTime((0.18 / (idx + 1)) * velocity, t0);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (2.1 / Math.sqrt(r)));
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t0); osc.stop(t0 + 2.2);
          oscs.push(osc); gains.push(gain);
        });
        registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: oscs, gain: gains, stopTime: t0 + 2.2, releaseTime: 0.16 }), 2.3);
        return;
      }

      // Special 2: Sleigh Bells (Staggered 5-bell cluster + metallic rattle)
      if (isSleighBells) {
        if (hasK250Sample("k2k_rattle")) {
          playSamplerVoice({ key: "k2k_rattle", midiNote, pitchRatio: 1.15, velocity: velocity * 0.85, attack: 0.001, decay: 0.65, cutoff: 16000, canLoop: false, releaseTime: 0.12 });
        }
        const bellOffsets = [0, 0.014, 0.029, 0.044, 0.060];
        const bellFreqs = [2850, 3420, 4190, 5120, 6240];
        bellOffsets.forEach((dt, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(bellFreqs[i] * (0.95 + ((effMidi % 7) * 0.02)), t0 + dt);
          gain.gain.setValueAtTime(0.0001, t0);
          gain.gain.setValueAtTime(0.14 * velocity, t0 + dt);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.35);
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t0 + dt); osc.stop(t0 + dt + 0.38);
          oscs.push(osc); gains.push(gain);
        });
        registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: oscs, gain: gains, stopTime: t0 + 0.45, releaseTime: 0.12 }), 0.5);
        return;
      }

      // Special 3: Wind Chimes Tree (Cascading pentatonic shimmer arpeggio)
      if (isWindChimes) {
        const cascade = [1.0, 1.125, 1.25, 1.5, 1.667, 2.0];
        cascade.forEach((mult, i) => {
          const dt = i * 0.024;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(Math.min(7800, freq * 1.5 * mult), t0 + dt);
          gain.gain.setValueAtTime(0.0001, t0);
          gain.gain.setValueAtTime(0.16 * velocity, t0 + dt);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 1.4);
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t0 + dt); osc.stop(t0 + dt + 1.45);
          oscs.push(osc); gains.push(gain);
        });
        registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: oscs, gain: gains, stopTime: t0 + 1.65, releaseTime: 0.16 }), 1.75);
        return;
      }

      // Special 4: Big Cinematic Impact (Sub-boom drop + Orchestral Drum slam)
      if (isImpact) {
        if (hasK250Sample("k2k_orchdrum")) {
          playSamplerVoice({ key: "k2k_orchdrum", midiNote, pitchRatio: 0.85, velocity: velocity * 1.15, attack: 0.001, decay: 2.5, cutoff: 8000, canLoop: false, releaseTime: 0.25 });
        }
        const sub = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        sub.type = "sine";
        sub.frequency.setValueAtTime(115, t0);
        sub.frequency.exponentialRampToValueAtTime(34, t0 + 0.55);
        subGain.gain.setValueAtTime(0.55 * velocity, t0);
        subGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.8);
        sub.connect(subGain); subGain.connect(getTrackBusNode(3));
        sub.start(t0); sub.stop(t0 + 1.85);
        oscs.push(sub); gains.push(subGain);
        registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: oscs, gain: gains, stopTime: t0 + 1.85, releaseTime: 0.25 }), 1.95);
        return;
      }

      // Tuned Bar & Bell Partials
      const partials = isMarimbaVibes ? [1.0, 3.0, 4.0] :
                       isMarimba ? [1.0, 4.0] :
                       isBalafon ? [1.0, 2.02, 3.98, 5.85] :
                       isVibes ? [1.0, 3.0, 5.0] :
                       isCrotales ? [1.0, 2.756, 5.404, 8.93] :
                       isGlock ? [1.0, 2.76, 5.4] :
                       isXylo ? [1.0, 3.0, 6.0] :
                       isChimes ? [1.0, 2.76, 5.4, 8.9] :
                       isSteel ? [1.0, 2.0, 3.0, 4.15] :
                       isGamelan ? [1.0, 1.53, 2.41, 3.88] :
                       isKalimba ? [1.0, 2.92, 6.2] : [1.0, 3.0];

      const dec = isXylo ? 0.42 : (isBalafon ? 0.65 : (isMarimba ? 0.9 : (isKalimba ? 1.1 : (isGamelan ? 2.8 : (isVibes ? 2.5 : (isChimes || isCrotales ? 3.5 : 1.8))))));

      partials.forEach((ratio, idx) => {
        const osc = audioCtx.createOscillator();
        osc.type = (isGamelan && idx > 0) ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq * ratio, t0);

        const gain = audioCtx.createGain();
        const partVol = (idx === 0 ? 0.38 : (0.22 / (idx + 1))) * velocity;
        gain.gain.setValueAtTime(partVol, t0);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (dec / Math.sqrt(ratio)));

        // Vibraphone Motor Tremolo (4.8 Hz LFO)
        if (isVibes && idx === 0) {
          vibLfo = audioCtx.createOscillator();
          const lfoGain = audioCtx.createGain();
          vibLfo.frequency.setValueAtTime(4.8, t0);
          lfoGain.gain.setValueAtTime(partVol * 0.35, t0);
          vibLfo.connect(lfoGain);
          lfoGain.connect(gain.gain);
          vibLfo.start(t0);
          vibLfo.stop(t0 + dec + 0.1);
        }

        osc.connect(gain);
        gain.connect(getTrackBusNode(3));
        osc.start(t0);
        osc.stop(t0 + dec + 0.1);
        oscs.push(osc);
        gains.push(gain);
      });

      // Balafon mirliton buzz or Kalimba thumb-pluck click
      if (isBalafon || isKalimba) {
        const nBuf = get808NoiseBuffer();
        if (nBuf) {
          const nSrc = audioCtx.createBufferSource();
          nSrc.buffer = nBuf;
          const bp = audioCtx.createBiquadFilter();
          bp.type = "bandpass";
          bp.frequency.setValueAtTime(Math.min(6000, freq * (isBalafon ? 2.4 : 4.2)), t0);
          bp.Q.setValueAtTime(isBalafon ? 3.5 : 2.2, t0);
          const nGain = audioCtx.createGain();
          nGain.gain.setValueAtTime((isBalafon ? 0.14 : 0.12) * velocity, t0);
          nGain.gain.exponentialRampToValueAtTime(0.0001, t0 + (isBalafon ? 0.055 : 0.014));
          nSrc.connect(bp); bp.connect(nGain); nGain.connect(getTrackBusNode(3));
          nSrc.start(t0); nSrc.stop(t0 + 0.07);
          oscs.push(nSrc); gains.push(nGain);
        }
      }

      const voice = new ActiveVoice({
        note: midiNote,
        src: oscs,
        gain: gains,
        lfo: vibLfo,
        stopTime: t0 + dec + 0.1,
        releaseTime: 0.16
      });
      registerActiveVoice(midiNote, voice, dec + 0.2);
    }

    // 3b. Orchestral Concert Harp (Warm Pluck Fundamental + Shimmer Overtones)
    function playHarpVoice(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const freq = 440 * Math.pow(2, (effMidi - 69) / 12);
      const dec = Math.max(1.4, Math.min(3.2, p.dec || 2.4));

      const osc1 = audioCtx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, t0);

      const osc2 = audioCtx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2.0, t0);

      const osc3 = audioCtx.createOscillator();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(freq * 3.0, t0);

      const g1 = audioCtx.createGain();
      const g2 = audioCtx.createGain();
      const g3 = audioCtx.createGain();
      g1.gain.setValueAtTime(0.0001, t0);
      g1.gain.linearRampToValueAtTime(0.36 * velocity, t0 + 0.005);
      g1.gain.exponentialRampToValueAtTime(0.0001, t0 + dec);

      g2.gain.setValueAtTime(0.0001, t0);
      g2.gain.linearRampToValueAtTime(0.16 * velocity, t0 + 0.004);
      g2.gain.exponentialRampToValueAtTime(0.0001, t0 + dec * 0.42);

      g3.gain.setValueAtTime(0.0001, t0);
      g3.gain.linearRampToValueAtTime(0.06 * velocity, t0 + 0.003);
      g3.gain.exponentialRampToValueAtTime(0.0001, t0 + dec * 0.16);

      const bodyFilter = audioCtx.createBiquadFilter();
      bodyFilter.type = "lowpass";
      bodyFilter.frequency.setValueAtTime(Math.min(4400, freq * 7.5), t0);
      bodyFilter.frequency.exponentialRampToValueAtTime(Math.max(420, freq * 1.8), t0 + dec * 0.65);
      bodyFilter.Q.setValueAtTime(0.9, t0);

      osc1.connect(g1);
      osc2.connect(g2);
      osc3.connect(g3);
      g1.connect(bodyFilter);
      g2.connect(bodyFilter);
      g3.connect(bodyFilter);
      bodyFilter.connect(getTrackBusNode(3));

      osc1.start(t0); osc2.start(t0); osc3.start(t0);
      osc1.stop(t0 + dec + 0.08);
      osc2.stop(t0 + dec + 0.08);
      osc3.stop(t0 + dec + 0.08);

      const voice = new ActiveVoice({
        note: midiNote,
        src: [osc1, osc2, osc3],
        gain: [g1, g2, g3],
        filter: bodyFilter,
        stopTime: t0 + dec + 0.08,
        releaseTime: 0.16
      });
      registerActiveVoice(midiNote, voice, dec + 0.15, "k250");
    }

    // 3B. K250 Bowed String Ensemble Engine (Multi-Zone IFFT Loop matched to K250 Grand Strings)
    const k250StringBufCache = new Map();
    const K250_STRING_ZONES = [36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84];

    function ifftInPlace(re, im) {
      const n = re.length;
      for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
          let tr = re[i]; re[i] = re[j]; re[j] = tr;
          let ti = im[i]; im[i] = im[j]; im[j] = ti;
        }
      }
      for (let len = 2; len <= n; len <<= 1) {
        const half = len >> 1;
        const ang = (2 * Math.PI) / len; // positive sign for inverse DFT
        const wLenRe = Math.cos(ang);
        const wLenIm = Math.sin(ang);
        for (let i = 0; i < n; i += len) {
          let wRe = 1.0, wIm = 0.0;
          for (let j = 0; j < half; j++) {
            const uRe = re[i + j], uIm = im[i + j];
            const vRe = re[i + j + half] * wRe - im[i + j + half] * wIm;
            const vIm = re[i + j + half] * wIm + im[i + j + half] * wRe;
            re[i + j] = uRe + vRe;
            im[i + j] = uIm + vIm;
            re[i + j + half] = uRe - vRe;
            im[i + j + half] = uIm - vIm;
            const nxtRe = wRe * wLenRe - wIm * wLenIm;
            wIm = wRe * wLenIm + wIm * wLenRe;
            wRe = nxtRe;
          }
        }
      }
    }

    function getK250StringBuffer(zoneMidi, variant, sr) {
      const cacheKey = `${zoneMidi}_${variant}_${sr}`;
      if (k250StringBufCache.has(cacheKey)) return k250StringBufCache.get(cacheKey);

      const N = 131072; // ~2.73s @ 48kHz -> 0.366 Hz bin resolution, zero loop seam
      const df = sr / N;
      const re = new Float64Array(N);
      const im = new Float64Array(N);
      const baseFreq = 440 * Math.pow(2, (zoneMidi - 69) / 12);

      const detunesCents = variant === "grand"
        ? [-15.5, -10.4, -6.1, -2.0, 2.0, 6.1, 10.4, 15.5]
        : [-11.5, -6.8, -2.2, 2.2, 6.8, 11.5];
      const maxHarmFreq = variant === "cello" ? 6800 : 12200;

      const bodyGain = (fHz) => {
        // Sculpted K250 string bridge + wood formant envelope matching 023_Grand_Strings.mp3
        let g = 1.0;
        if (variant === "cello") {
          const chest = Math.exp(-Math.pow((Math.log2(Math.max(40, fHz) / 230)) / 0.95, 2));
          const bridge = Math.exp(-Math.pow((Math.log2(Math.max(40, fHz) / 1450)) / 0.85, 2));
          g *= (0.75 + 0.95 * chest + 0.45 * bridge) / (1.0 + Math.pow(fHz / 3400, 2.2));
        } else if (variant === "violin") {
          const wood = Math.exp(-Math.pow((Math.log2(Math.max(40, fHz) / 560)) / 0.85, 2));
          const bridge = Math.exp(-Math.pow((Math.log2(Math.max(40, fHz) / 2900)) / 0.85, 2));
          const lowCut = Math.min(1.0, Math.pow(fHz / 210, 1.35));
          g *= lowCut * (0.68 + 0.55 * wood + 1.45 * bridge) / (1.0 + Math.pow(fHz / 6500, 2.0));
        } else {
          const warmth = Math.exp(-Math.pow((Math.log2(Math.max(40, fHz) / 520)) / 0.95, 2));
          const bridge = Math.exp(-Math.pow((Math.log2(Math.max(40, fHz) / 2850)) / 0.90, 2));
          const lowTaper = Math.min(1.0, 0.45 + 0.55 * Math.min(1.0, fHz / 220));
          g *= lowTaper * (0.65 + 0.55 * warmth + 1.45 * bridge) / (1.0 + Math.pow(fHz / 6400, 2.0));
        }
        return g;
      };

      const nyquistLimit = sr * 0.44;
      for (let v = 0; v < detunesCents.length; v++) {
        const fPlayer = baseFreq * Math.pow(2, detunesCents[v] / 1200);
        const maxH = Math.min(48, Math.floor(Math.min(maxHarmFreq, nyquistLimit) / fPlayer));
        for (let k = 1; k <= maxH; k++) {
          const hkFreq = k * fPlayer;
          const bin = Math.round(hkFreq / df);
          if (bin <= 0 || bin >= (N >> 1)) continue;
          const amp = (1.0 / Math.pow(k, 0.82)) * bodyGain(hkFreq);
          const phase = ((v * 2.3999632 + k * 1.6180339 + zoneMidi * 0.47) % (2 * Math.PI));
          const halfAmp = amp * 0.5;
          const c = halfAmp * Math.cos(phase);
          const s = halfAmp * Math.sin(phase);
          re[bin] += c;
          im[bin] += s;
          re[N - bin] += c;
          im[N - bin] -= s;
        }
      }

      ifftInPlace(re, im);

      // Peak-normalize steady-state periodic waveform for uniform dynamic headroom
      let peak = 1e-6;
      for (let i = 0; i < N; i++) {
        const a = Math.abs(re[i]);
        if (a > peak) peak = a;
      }
      const norm = 0.55 / peak;

      const attackSamples = Math.round(sr * 0.14);
      const buf = audioCtx.createBuffer(1, attackSamples + N, sr);
      const out = buf.getChannelData(0);

      // Smooth bow attack into periodic loop: wrapped from end of periodBuf so attack->loop has C1 continuity
      let seed = (zoneMidi * 4999 + 131) & 0xFFFF;
      let rosinLp = 0;
      for (let i = 0; i < attackSamples; i++) {
        const tFrac = i / attackSamples;
        const env = 0.5 - 0.5 * Math.cos(Math.PI * tFrac);
        const pIdx = (N - (attackSamples - i)) % N;
        seed = (seed * 16807) % 2147483647;
        const rnd = (seed / 1073741823.5) - 1.0;
        rosinLp = rosinLp * 0.55 + rnd * 0.45;
        const rosinEnv = Math.sin(Math.PI * tFrac) * Math.exp(-tFrac * 3.5);
        out[i] = re[pIdx] * norm * env + rosinLp * 0.032 * rosinEnv;
      }
      for (let i = 0; i < N; i++) {
        out[attackSamples + i] = re[i] * norm;
      }

      if (k250StringBufCache.size > 48) k250StringBufCache.clear();
      k250StringBufCache.set(cacheKey, buf);
      return buf;
    }

    function playK250StringVoice(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const pName = (p && p.name) || "";
      const variant = (pName.includes("CELLO") || pName.includes("BASS") || pName.includes("VIOLA"))
        ? "cello"
        : ((pName.includes("VIOLIN") || pName.includes("FIDDLE")) ? "violin" : "grand");

      let zoneMidi = K250_STRING_ZONES[0];
      let minDiff = Math.abs(effMidi - zoneMidi);
      for (let i = 1; i < K250_STRING_ZONES.length; i++) {
        const d = Math.abs(effMidi - K250_STRING_ZONES[i]);
        if (d < minDiff) { minDiff = d; zoneMidi = K250_STRING_ZONES[i]; }
      }

      const buf = getK250StringBuffer(zoneMidi, variant, audioCtx.sampleRate);
      const pitchRatio = Math.pow(2, (effMidi - zoneMidi) / 12);

      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.setValueAtTime(pitchRatio, t0);
      src.loop = true;
      src.loopStart = 0.14;
      src.loopEnd = buf.duration;

      const totalDetune = (p.det || 0) + (typeof globalPitchBendCents === "number" ? globalPitchBendCents : 0);
      if (totalDetune !== 0) src.detune.setValueAtTime(totalDetune, t0);

      const effAttack = Math.max(0.016, (p.att || 0.045) * 0.55 * (typeof envAttackMult === "number" ? envAttackMult : 1.0));
      const maxHold = 14.0;
      const effVel = Math.max(0.05, Math.min(1.4, velocity)) * 0.86;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(effVel, t0 + effAttack);
      gain.gain.linearRampToValueAtTime(effVel * 0.88, t0 + maxHold);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + maxHold + 0.6);

      let lastNode = gain;
      let filterNode = null;
      const cut = p.cut || 14000;
      if (cut < 17500) {
        filterNode = audioCtx.createBiquadFilter();
        filterNode.type = p.filt || "lowpass";
        filterNode.frequency.setValueAtTime(cut, t0);
        filterNode.Q.setValueAtTime(p.res || 0.85, t0);
        gain.connect(filterNode);
        lastNode = filterNode;
      }

      const modDepthCents = (typeof globalModWheel === "number" ? globalModWheel : 0) * 32;
      const vibR = (p.vibR && p.vibR > 0) ? p.vibR : 4.8;
      const vibD = ((p.vibD && p.vibD > 0) ? p.vibD : 8) + modDepthCents;
      const lfoNode = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfoNode.frequency.setValueAtTime(vibR, t0);
      lfoGain.gain.setValueAtTime(vibD, t0);
      lfoNode.connect(lfoGain);
      lfoGain.connect(src.detune);
      lfoNode.start(t0);
      lfoNode.stop(t0 + maxHold + 0.7);

      src.connect(gain);
      lastNode.connect(getTrackBusNode(3));
      src.start(t0);
      src.stop(t0 + maxHold + 0.7);

      const voice = new ActiveVoice({
        note: midiNote,
        src,
        gain,
        filter: filterNode,
        lfo: lfoNode,
        stopTime: t0 + maxHold + 0.7,
        releaseTime: 0.28
      });
      registerActiveVoice(midiNote, voice, maxHold + 0.8, "k250");
      return voice;
    }

    // 4. Classical Harpsichord (Physical Karplus-Strong Plucked String + Soundboard Resonator)
    const harpsichordBufCache = new Map();
    function getHarpsichordStringBuffer(freq, variant, sr) {
      const cacheKey = `${Math.round(freq * 100)}_${variant}_${sr}`;
      if (harpsichordBufCache.has(cacheKey)) return harpsichordBufCache.get(cacheKey);
      const dur = variant === "lute" ? 1.55 : 2.15;
      const len = Math.floor(sr * dur);
      const buf = audioCtx.createBuffer(1, len, sr);
      const out = buf.getChannelData(0);

      const renderString = (f, scale, damping) => {
        const period = Math.max(4, sr / f);
        const pInt = Math.floor(period);
        const frac = period - pInt;
        const line = new Float32Array(pInt + 2);
        // Bright quill plectrum pluck excitation (~1/8 bridge position comb) preserving 3-11 kHz wire brilliance
        const combLag = Math.max(2, Math.round(pInt * 0.13));
        let lp = 0;
        let seed = (Math.round(f * 131) + 977) & 0xFFFF;
        for (let i = 0; i <= pInt; i++) {
          seed = (seed * 16807) % 2147483647;
          const rnd = (seed / 1073741823.5) - 1.0;
          lp = lp * 0.12 + rnd * 0.88;
          line[i] = lp * Math.sin((Math.PI * (i + 1)) / (pInt + 2));
        }
        for (let i = pInt; i >= combLag; i--) {
          line[i] -= 0.56 * line[i - combLag];
        }
        let idx = 0;
        let prev = line[pInt - 1];
        for (let n = 0; n < len; n++) {
          const nextIdx = (idx + 1) % pInt;
          const cur = line[idx] * (1 - frac) + line[nextIdx] * frac;
          const filt = damping * (0.76 * cur + 0.24 * prev);
          out[n] += cur * scale;
          prev = cur;
          line[idx] = filt;
          idx = nextIdx;
        }
      };

      const damp8 = variant === "lute" ? 0.9942 : 0.9978;
      renderString(freq, 0.54, damp8);
      if (variant === "coupled") {
        renderString(freq * 2.0, 0.30, 0.9966); // Crisp 4-foot coupled octave wire rank
      } else if (variant !== "lute") {
        renderString(freq * 2.0, 0.11, 0.9948); // Acoustic soundboard octave bloom
      }

      // Subtle crisp 3ms quill jack transient click for Baroque articulation
      const clickLen = Math.min(len, Math.floor(sr * 0.0035));
      let cSeed = (Math.round(freq * 71) + 313) & 0xFFFF;
      let cPrev = 0;
      for (let i = 0; i < clickLen; i++) {
        cSeed = (cSeed * 16807) % 2147483647;
        const r = (cSeed / 1073741823.5) - 1.0;
        const hp = r - 0.72 * cPrev;
        cPrev = r;
        const win = Math.sin((Math.PI * i) / clickLen) * Math.exp(-i / (sr * 0.0011));
        out[i] += hp * 0.11 * win;
      }

      // Smooth 1.2ms onset & tail fadeout
      const fadeIn = Math.min(len, Math.floor(sr * 0.0012));
      for (let i = 0; i < fadeIn; i++) out[i] *= (i / fadeIn);
      const fadeOut = Math.min(len, Math.floor(sr * 0.14));
      for (let i = 0; i < fadeOut; i++) out[len - 1 - i] *= (i / fadeOut);

      if (harpsichordBufCache.size > 160) harpsichordBufCache.clear();
      harpsichordBufCache.set(cacheKey, buf);
      return buf;
    }

    function playHarpsichordVoice(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t0 = getAudioTime();
      const freq = 440 * Math.pow(2, (effMidi - 69) / 12);
      const pName = (p && p.name) || "";
      const variant = pName.includes("LUTE") ? "lute" : ((pName.includes("8+4") || (p && p.id === 13)) ? "coupled" : "eight");
      const dur = variant === "lute" ? 1.55 : 2.15;

      const src = audioCtx.createBufferSource();
      src.buffer = getHarpsichordStringBuffer(freq, variant, audioCtx.sampleRate);

      const hpFilter = audioCtx.createBiquadFilter();
      hpFilter.type = "highpass";
      hpFilter.frequency.setValueAtTime(110, t0);

      const bodyFilter = audioCtx.createBiquadFilter();
      bodyFilter.type = "peaking";
      bodyFilter.frequency.setValueAtTime(380, t0);
      bodyFilter.Q.setValueAtTime(0.95, t0);
      bodyFilter.gain.setValueAtTime(3.2, t0);

      const quillFilter = audioCtx.createBiquadFilter();
      quillFilter.type = "peaking";
      quillFilter.frequency.setValueAtTime(2050, t0);
      quillFilter.Q.setValueAtTime(1.05, t0);
      quillFilter.gain.setValueAtTime(2.6, t0);

      const lpFilter = audioCtx.createBiquadFilter();
      lpFilter.type = "lowpass";
      const dynBright = 0.55 + 0.45 * Math.min(1.2, velocity);
      lpFilter.frequency.setValueAtTime(Math.min(14500, Math.max(7200, freq * 18.0) * dynBright), t0);
      lpFilter.frequency.exponentialRampToValueAtTime(Math.max(2400, Math.min(6200, freq * 4.8)), t0 + dur * 0.68);
      lpFilter.Q.setValueAtTime(0.7, t0);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(1.08 * velocity, t0 + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      src.connect(hpFilter);
      hpFilter.connect(bodyFilter);
      bodyFilter.connect(quillFilter);
      quillFilter.connect(lpFilter);
      lpFilter.connect(gain);
      gain.connect(getTrackBusNode(3));

      src.start(t0);
      src.stop(t0 + dur + 0.04);

      const voice = new ActiveVoice({
        note: midiNote,
        src,
        gain,
        filter: lpFilter,
        stopTime: t0 + dur + 0.04,
        releaseTime: 0.085
      });
      registerActiveVoice(midiNote, voice, dur + 0.1, "k250");
    }

    // 5. Acoustic Drum Kits, TR-909 & Specialized Percussion Engines
    let active909OpenHatGain = null;

    function playAcousticDrumKitVoice(midiNote, effMidi, velocity, p) {
      if (!audioCtx) initAudio();
      const t = getAudioTime();
      const pc = ((effMidi % 12) + 12) % 12;
      const vel = Math.max(0.1, Math.min(1.4, velocity));
      const name = p.name || "";

      const triggerSample = (key, pitchRatio = 1.0, dec = p.dec || 2.0, cut = p.cut || 14000, vScale = 1.0) => {
        const k = hasK250Sample(key) ? key : "drum_kick";
        playSamplerVoice({
          key: k, midiNote, pitchRatio, velocity: vel * vScale,
          attack: 0.001, decay: dec, cutoff: cut, res: p.res || 1.0,
          canLoop: false, releaseTime: 0.12
        });
      };

      const isBlack = [1, 3, 6, 8, 10].includes(pc);

      // A. Orchestral & Marching Bass Drum (100% Pure K250 Gran Cassa + Warm Low Bass Drum Layer) - ID 221
      if (p.id === 221 || name.includes("GRAN CASSA")) {
        const key = hasK250Sample("vsco_gran_cassa") ? "vsco_gran_cassa" : ((pc % 2 === 0) ? "k2k_orchdrum" : "k2k_bassdrumrum");
        const ratio = 0.88 + (pc * 0.014);
        playSamplerVoice({
          key, midiNote, pitchRatio: ratio, velocity: vel * 1.48,
          attack: 0.001, decay: isBlack ? 0.95 : 3.5, cutoff: isBlack ? 2200 : 4200, res: 0.7,
          canLoop: false, naturalSustain: true,
          releaseTime: isBlack ? 0.45 : 0.95
        });
        if (!isBlack && hasK250Sample("k2k_bassdrumrum")) {
          // Deep sampled K250 bass drum low weight
          playSamplerVoice({
            key: "k2k_bassdrumrum", midiNote, pitchRatio: 0.68, velocity: vel * 0.82,
            attack: 0.002, decay: 1.4, cutoff: 650, res: 0.65,
            canLoop: false, naturalSustain: true, releaseTime: 0.65
          });
        }
        return;
      }

      // B. Marching & Concert Field Snare + Tenor Quads (100% Pure K250 Sampled Battery) - ID 222
      if (p.id === 222 || name.includes("FIELD DRUM")) {
        let sKey = "sonor_snare";
        let sRatio = 1.06 + (pc * 0.012);
        let sCut = 15200;
        let sVs = 1.48;
        let sDec = 1.35;
        let isTenor = false;
        if (pc === 1 || pc === 3) {
          sKey = "sonor_snare_soft"; sRatio = pc === 1 ? 1.10 : 1.20; sVs = 1.18; sDec = 0.85;
        } else if (pc === 5 || pc === 6) {
          sKey = "sonor_tom_lo"; sRatio = pc === 5 ? 0.86 : 0.98; sCut = 10500; sVs = 1.48; sDec = 1.20;
          isTenor = true;
        } else if (pc === 8 || pc === 9 || pc === 10) {
          sKey = "sonor_tom_hi"; sRatio = pc === 8 ? 0.96 : (pc === 9 ? 1.12 : 1.28); sCut = 12000; sVs = 1.46; sDec = 1.10;
          isTenor = true;
        } else if (pc === 7 || pc === 11) {
          sKey = "sonor_snare"; sRatio = 1.16; sCut = 16200; sVs = 1.56;
        }
        const finalKey = hasK250Sample(sKey) ? sKey : "k2k_snare1";
        playSamplerVoice({
          key: finalKey, midiNote, pitchRatio: sRatio, velocity: vel * sVs,
          attack: 0.001, decay: sDec, cutoff: sCut, res: 0.7,
          canLoop: false, naturalSustain: true, releaseTime: 0.28
        });
        if (!isTenor && pc !== 1 && pc !== 3 && hasK250Sample("k2k_snare1")) {
          // Crisp sampled K250 field snare snap transient layer
          playSamplerVoice({
            key: "k2k_snare1", midiNote, pitchRatio: 1.22, velocity: vel * 0.56,
            attack: 0.001, decay: 0.45, cutoff: 14000, res: 0.7,
            canLoop: false, naturalSustain: true, releaseTime: 0.14
          });
        }
        return;
      }

      // C. Piatti Crash Cymbals (Real VSCO Piatti + Sonor Crash) - ID 223
      if (p.id === 223 || name.includes("PIATTI")) {
        const key = (pc === 11 && hasK250Sample("sonor_crash")) ? "sonor_crash"
          : (hasK250Sample("vsco_piatti") ? "vsco_piatti" : "k2k_cymbal1");
        const ratio = 0.94 + (pc * 0.014);
        playSamplerVoice({
          key, midiNote, pitchRatio: ratio, velocity: vel * 1.12,
          attack: 0.002, decay: isBlack ? 1.25 : 3.80, cutoff: 15500, res: 0.7,
          canLoop: false, naturalSustain: true, releaseTime: isBlack ? 0.40 : 1.15
        });
        return;
      }

      // D. Castanets & Spanish Wood - ID 224
      if (p.id === 224 || name.includes("CASTANETS")) {
        const hits = isBlack ? [0, 0.048] : [0]; // Double Flamenco clack on black keys
        const baseFreq = pc === 2 || pc === 7 ? 2150 : (pc === 4 || pc === 9 ? 980 : 1480);
        const oscs = [];
        const gains = [];
        hits.forEach((dt, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(baseFreq * (1 + idx * 0.06), t + dt);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, t + dt + 0.035);
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.setValueAtTime(vel * 0.88, t + dt);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.145);
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t + dt); osc.stop(t + dt + 0.155);
          oscs.push(osc); gains.push(gain);

          const nBuf = get808NoiseBuffer();
          if (nBuf) {
            const nSrc = audioCtx.createBufferSource(); nSrc.buffer = nBuf;
            const bp = audioCtx.createBiquadFilter();
            bp.type = "bandpass"; bp.frequency.setValueAtTime(baseFreq * 1.35, t + dt); bp.Q.setValueAtTime(2.6, t + dt);
            const nGain = audioCtx.createGain();
            nGain.gain.setValueAtTime(0.001, t);
            nGain.gain.setValueAtTime(vel * 0.72, t + dt);
            nGain.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.058);
            nSrc.connect(bp); bp.connect(nGain); nGain.connect(getTrackBusNode(3));
            nSrc.start(t + dt); nSrc.stop(t + dt + 0.065);
            oscs.push(nSrc); gains.push(nGain);
          }
        });
        registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: oscs, gain: gains, stopTime: t + 0.18, releaseTime: 0.05 }), 0.2);
        return;
      }

      // E. Orchestral Tambourine - ID 225
      if (p.id === 225 || name.includes("TAMBOURINE")) {
        const sagats = ["k25_sagat1", "k25_sagat2", "k25_sagat3"];
        if (isBlack) {
          triggerSample("k2k_rattle", 1.18, 0.55, 16000, 1.0);
        } else {
          triggerSample(sagats[pc % sagats.length], 1.1 + (pc * 0.02), 0.75, 16000, 0.95);
          triggerSample("k2k_shaker", 1.15, 0.45, 16000, 0.8);
        }
        const nBuf = get808NoiseBuffer();
        if (nBuf) {
          const nSrc = audioCtx.createBufferSource(); nSrc.buffer = nBuf;
          const hp = audioCtx.createBiquadFilter();
          hp.type = "highpass"; hp.frequency.setValueAtTime(6200, t);
          const nGain = audioCtx.createGain();
          nGain.gain.setValueAtTime(vel * 0.36, t);
          nGain.gain.exponentialRampToValueAtTime(0.0001, t + (isBlack ? 0.24 : 0.11));
          nSrc.connect(hp); hp.connect(nGain); nGain.connect(getTrackBusNode(3));
          nSrc.start(t); nSrc.stop(t + 0.28);
          registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: nSrc, gain: nGain, stopTime: t + 0.28, releaseTime: 0.06 }), 0.3);
        }
        return;
      }

      // F. TR-909 Dance Kit - ID 239 (Authentic Hybrid Analog + Crisp PCM House Kit)
      if (p.id === 239 || name.includes("909")) {
        const role909 = [1, 10, 2, 5, 7, 3, 8, 4, 9, 11, 6, 3][pc];
        const oscs = [], gains = [];
        if (role909 === 1) { // 909 Kick (hard pitch snap + punchy attack click)
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(175, t);
          osc.frequency.exponentialRampToValueAtTime(52, t + 0.015);
          osc.frequency.exponentialRampToValueAtTime(42, t + 0.32);
          gain.gain.setValueAtTime(vel * 0.85, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t); osc.stop(t + 0.38);
          oscs.push(osc); gains.push(gain);
        } else if (role909 === 2) { // 909 Snare (bright crisp white noise + dual shell)
          const osc = audioCtx.createOscillator();
          const oGain = audioCtx.createGain();
          osc.type = "triangle"; osc.frequency.setValueAtTime(205, t);
          osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);
          oGain.gain.setValueAtTime(vel * 0.42, t);
          oGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
          osc.connect(oGain); oGain.connect(getTrackBusNode(3));
          osc.start(t); osc.stop(t + 0.14);
          oscs.push(osc); gains.push(oGain);
          const nBuf = get808NoiseBuffer();
          if (nBuf) {
            const nSrc = audioCtx.createBufferSource(); nSrc.buffer = nBuf;
            const hp = audioCtx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.setValueAtTime(2900, t);
            const nGain = audioCtx.createGain();
            nGain.gain.setValueAtTime(vel * 0.55, t);
            nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.19);
            nSrc.connect(hp); hp.connect(nGain); nGain.connect(getTrackBusNode(3));
            nSrc.start(t); nSrc.stop(t + 0.22);
            oscs.push(nSrc); gains.push(nGain);
          }
        } else if (role909 === 3 || role909 === 4) { // 909 CH / OH with choke
          if (role909 === 3 && active909OpenHatGain) {
            try {
              active909OpenHatGain.gain.cancelScheduledValues(t);
              active909OpenHatGain.gain.setValueAtTime(Math.max(0.0001, active909OpenHatGain.gain.value), t);
              active909OpenHatGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.01);
            } catch (e) {}
            active909OpenHatGain = null;
          }
          const nBuf = get808NoiseBuffer();
          if (nBuf) {
            const nSrc = audioCtx.createBufferSource(); nSrc.buffer = nBuf;
            const hp = audioCtx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.setValueAtTime(7200, t);
            const nGain = audioCtx.createGain();
            const dur = role909 === 4 ? 0.34 : 0.055;
            nGain.gain.setValueAtTime(vel * 0.45, t);
            nGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
            nSrc.connect(hp); hp.connect(nGain); nGain.connect(getTrackBusNode(3));
            nSrc.start(t); nSrc.stop(t + dur + 0.03);
            if (role909 === 4) active909OpenHatGain = nGain;
            oscs.push(nSrc); gains.push(nGain);
          }
        } else if (role909 === 5) { // 909 House Clap
          triggerSample("k25_clap1", 1.08, 0.45, 16000, 1.1);
          return;
        } else if (role909 === 7 || role909 === 8 || role909 === 9) { // 909 Toms
          const baseF = role909 === 7 ? 115 : (role909 === 8 ? 165 : 230);
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(baseF * 1.65, t);
          osc.frequency.exponentialRampToValueAtTime(baseF, t + 0.16);
          gain.gain.setValueAtTime(vel * 0.62, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t); osc.stop(t + 0.30);
          oscs.push(osc); gains.push(gain);
        } else { // 909 Ride / Crash / Rim
          triggerSample(role909 === 11 ? "k2k_ride" : "k2k_clap", role909 === 10 ? 1.45 : 1.12, 0.85, 16000, 0.95);
          return;
        }
        registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: oscs, gain: gains, stopTime: t + 0.45, releaseTime: 0.08 }), 0.5);
        return;
      }

      // G. Latin Congas & Bongos - ID 241 (Uses embedded k25_* hand-percussion + resonant Conga/Bongo membrane)
      if (p.id === 241 || name.includes("CONGAS") || name.includes("BONGOS")) {
        const latinBank = [
          { key: "k25_dohola1", ratio: 0.92, f0: 210, f1: 142 },
          { key: "k25_dohola2", ratio: 1.08, f0: 295, f1: 205 },
          { key: "k25_davol1", ratio: 0.88, f0: 175, f1: 118 },
          { key: "k25_dof1", ratio: 1.05, f0: 260, f1: 185 },
          { key: "k25_zarb1", ratio: 1.12, f0: 340, f1: 240 },
          { key: "k25_rek1", ratio: 1.0, f0: 410, f1: 310 },
          { key: "k25_tabla1rak", ratio: 1.06, f0: 380, f1: 280 },
          { key: "k2k_cowbell", ratio: 1.0, f0: 0, f1: 0 },
          { key: "k25_dohola3", ratio: 1.22, f0: 320, f1: 225 },
          { key: "k2k_shaker", ratio: 1.05, f0: 0, f1: 0 },
          { key: "k25_zarb3", ratio: 1.28, f0: 460, f1: 340 },
          { key: "k25_sagat1", ratio: 1.0, f0: 0, f1: 0 }
        ];
        const entry = latinBank[pc];
        triggerSample(entry.key, entry.ratio, 1.4, 9500, 1.9);
        if (entry.f0 > 0) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(entry.f0, t);
          osc.frequency.exponentialRampToValueAtTime(entry.f1, t + 0.045);
          gain.gain.setValueAtTime(vel * 0.45, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
          const lp = audioCtx.createBiquadFilter();
          lp.type = "lowpass"; lp.frequency.setValueAtTime(2200, t);
          osc.connect(lp); lp.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t); osc.stop(t + 0.36);
          registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: osc, gain, filter: lp, stopTime: t + 0.36, releaseTime: 0.08 }), 0.4);
        }
        return;
      }

      // H. Electronic Percussion Kit (Simmons SDS-V / Electro) - ID 240
      if (p.id === 240 || name.includes("ELECTRONIC PERCUSSION")) {
        if (pc === 0 || pc === 4 || pc === 6 || pc === 8) {
          // Pitch-swept Simmons Hex-Pad Toms
          const fStart = pc === 0 ? 160 : (pc === 4 ? 260 : (pc === 6 ? 360 : 490));
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(fStart, t);
          osc.frequency.exponentialRampToValueAtTime(fStart * 0.36, t + 0.22);
          gain.gain.setValueAtTime(vel * 0.58, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
          osc.connect(gain); gain.connect(getTrackBusNode(3));
          osc.start(t); osc.stop(t + 0.30);
          registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: osc, gain, stopTime: t + 0.30, releaseTime: 0.06 }), 0.35);
          return;
        }
        const electroBank = ["k2k_spacetom", "k2k_spacesnr", "k2k_tomshaker", "k2k_spacesnr", "k2k_spacetom", "k2k_tomshaker", "k2k_spacetom", "k2k_hihat2", "k2k_spacetom", "k2k_clap", "k2k_cymbal2", "k2k_hihat2"];
        triggerSample(electroBank[pc], 1.08, 1.5, 13000, 1.05);
        return;
      }

      // I. 80s Gated Reverb Snare Kit - ID 237
      if (p.id === 237 || name.includes("GATED REVERB")) {
        if (pc === 2 || pc === 5) { // Signature 80s Gated Snare!
          triggerSample("k2k_spacesnr", 1.0, 1.4, 15000, 1.05);
          const nBuf = get808NoiseBuffer();
          if (nBuf) {
            const nSrc = audioCtx.createBufferSource(); nSrc.buffer = nBuf;
            const bp = audioCtx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.setValueAtTime(1650, t); bp.Q.setValueAtTime(0.9, t);
            const nGain = audioCtx.createGain();
            nGain.gain.setValueAtTime(vel * 0.42, t);
            nGain.gain.linearRampToValueAtTime(vel * 0.36, t + 0.16); // flat gated sustain
            nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.195); // hard gate slam
            nSrc.connect(bp); bp.connect(nGain); nGain.connect(getTrackBusNode(3));
            nSrc.start(t); nSrc.stop(t + 0.21);
            registerActiveVoice(midiNote, new ActiveVoice({ note: midiNote, src: nSrc, gain: nGain, stopTime: t + 0.21, releaseTime: 0.04 }), 0.25);
          }
          return;
        }
        const gatedBank = ["drum_kick", "k25_clap1", "k2k_spacesnr", "k25_clap2", "k2k_spacetom", "k2k_spacesnr", "k2k_spacetom", "k2k_hihat1", "k2k_spacetom", "k2k_cymbal1", "k25_clap3", "k2k_hihat2"];
        triggerSample(gatedBank[pc], 1.0, 1.8, 16000, 1.05);
        return;
      }

      // J. Real Stereo Jazz Kit & Brushes (SamsSonor Studio Kit + VSCO Brush) - ID 236
      if (p.id === 236 || name.includes("JAZZ BRUSH")) {
        const jazzMap = [
          { key: "sonor_kick",       dec: 1.05, cut: 8500,  vs: 1.25 }, // 0 C: Punchy 20" Jazz Kick
          { key: "sonor_snare_soft", dec: 0.70, cut: 11000, vs: 0.90 }, // 1 C#: Snare ghost / sidestick
          { key: "sonor_snare",      dec: 0.85, cut: 13000, vs: 1.02 }, // 2 D: Crisp Snare backbeat
          { key: "vsco_brush",       dec: 0.65, cut: 12000, vs: 1.10 }, // 3 D#: Swish brush sweep
          { key: "sonor_snare_soft", dec: 0.75, cut: 10500, vs: 0.95 }, // 4 E: Soft snare accent
          { key: "sonor_tom_lo",     dec: 1.05, cut: 9000,  vs: 1.08 }, // 5 F: Floor tom
          { key: "sonor_hh_closed",  dec: 0.55, cut: 14000, vs: 0.95 }, // 6 F#: Tight Hi-Hat
          { key: "sonor_ride",       dec: 3.80, cut: 15500, vs: 1.08 }, // 7 G: Shimmering Jazz Ride Cymbal
          { key: "sonor_hh_pedal",   dec: 0.45, cut: 14000, vs: 1.05 }, // 8 G#: Classic 2&4 Hi-Hat Pedal Chick!
          { key: "sonor_tom_hi",     dec: 0.95, cut: 10000, vs: 1.05 }, // 9 A: Rack tom
          { key: "sonor_hh_open",    dec: 1.80, cut: 15000, vs: 0.92 }, // 10 A#: Open Hi-Hat wash
          { key: (effMidi >= 68 ? "sonor_ridebell" : "sonor_crash"), dec: 3.60, cut: 16000, vs: 1.02 } // 11 B: Crash / Ride Bell
        ];
        const jm = jazzMap[pc];
        const k = hasK250Sample(jm.key) ? jm.key : "drum_kick";
        playSamplerVoice({
          key: k, midiNote, pitchRatio: 1.0, velocity: vel * jm.vs,
          attack: 0.001, decay: jm.dec, cutoff: jm.cut,
          canLoop: false, naturalSustain: true, releaseTime: 0.18
        });
        return;
      }

      // K. Studio Tight Pop Kit - ID 234
      if (p.id === 234 || name.includes("STUDIO TIGHT POP")) {
        const popBank = ["drum_kick", "k2k_clap", "k2k_snare2", "k2k_shaker", "drum_tom", "k2k_hihat2", "drum_tom", "k2k_hihat2", "drum_tom", "drum_cymbal", "k2k_cowbell", "k2k_ride"];
        triggerSample(popBank[pc], 1.06, 0.75, 13000, 1.05);
        return;
      }

      // L. Rock Power Arena Drums - ID 235
      if (p.id === 235 || name.includes("ROCK POWER ARENA")) {
        const arenaBank = ["k2k_bassdrumrum", "k2k_spacesnr", "k2k_snare3", "k25_clap1", "k2k_tom2", "k2k_hihat1", "k2k_tom1", "k2k_hihat1", "k2k_orchdrum", "k2k_cymbal2", "k2k_cowbell", "k2k_cymbal1"];
        triggerSample(arenaBank[pc], (pc === 4 || pc === 6) ? 0.88 : 1.0, 3.2, 16000, 1.15);
        return;
      }

      // M. Orchestral Percussion Full Battery - ID 242
      if (p.id === 242 || name.includes("ORCHESTRAL PERCUSSION")) {
        const orchBank = ["k2k_orchdrum", "k2k_rattle", "k2k_snare1", "k2k_shaker", "k2k_tom1", "k2k_triangle", "k2k_tom2", "k2k_gong", "orch_timpani", "k2k_cymbal1", "k2k_cowbell", "k2k_cymbal2"];
        triggerSample(orchBank[pc], 1.0, 3.6, 16000, 1.1);
        return;
      }

      // N. West Room Acoustic Drum Kit (ID 233 & ID 250 Acoustic Drums/Bass Split)
      const westRoomBank = [
        "sonor_kick", "k2k_clap", "sonor_snare", "sonor_snare_soft",
        "sonor_tom_lo", "sonor_hh_closed", "sonor_hh_closed", "sonor_ride",
        "sonor_hh_pedal", "sonor_tom_hi", "sonor_hh_open", "sonor_crash"
      ];
      const wKey = hasK250Sample(westRoomBank[pc]) ? westRoomBank[pc] : "drum_kick";
      playSamplerVoice({
        key: wKey, midiNote, pitchRatio: 1.0, velocity: vel * (pc === 0 ? 1.22 : 1.02),
        attack: 0.001, decay: (pc === 7 || pc === 11) ? 3.8 : 1.4, cutoff: p.cut || 15500,
        canLoop: false, naturalSustain: true, releaseTime: 0.16
      });
    }

    // True 6-Operator / 32-Algorithm Yamaha DX7 FM Core + .SYX Parser/Exporter
    function parseDx7SyxBytes(bytes) {
      if (!bytes || bytes.length < 163) return [];
      const parsed = [];
      const parseVcedOpBase = (buf, off) => {
        const coarse = buf[off + 18] & 0x1F;
        const fine = buf[off + 19] & 0x63;
        const detune = ((buf[off + 20] & 0x0F) - 7) * 2;
        const level = Math.max(0.05, Math.min(1.0, (buf[off + 16] & 0x7F) / 99));
        const r1 = Math.max(10, buf[off] & 0x7F);
        const dec = Math.max(0.08, Math.min(3.5, (105 - r1) / 32));
        const modeOsc = (buf[off + 17] & 0x01);
        const baseRatio = modeOsc ? 1.0 : (coarse === 0 ? 0.5 : coarse);
        return { ratio: Number((baseRatio * (1 + fine * 0.01)).toFixed(3)), level, dec, detune };
      };

      // VMEM 32-Voice Dump (4104 bytes: F0 43 00 09 20 00 ... ck F7)
      if (bytes.length >= 4100 && bytes[0] === 0xF0 && bytes[3] === 0x09) {
        const dataStart = 6;
        for (let v = 0; v < 32; v++) {
          const base = dataStart + v * 128;
          if (base + 128 > bytes.length) break;
          const ops = [];
          // DX7 stores OP6..OP1 reversed
          for (let opIdx = 5; opIdx >= 0; opIdx--) {
            const off = base + (5 - opIdx) * 17;
            const r1 = bytes[off] & 0x63;
            const level = Math.max(0.05, Math.min(1.0, (bytes[off + 14] & 0x63) / 99));
            const modeDet = bytes[off + 12] || 0;
            const coarse = (bytes[off + 15] >> 1) & 0x1F;
            const fine = bytes[off + 16] & 0x63;
            const baseRatio = coarse === 0 ? 0.5 : coarse;
            const detune = (((modeDet >> 3) & 0x0F) - 7) * 2;
            ops[opIdx] = {
              ratio: Number((baseRatio * (1 + fine * 0.01)).toFixed(3)),
              level,
              dec: Math.max(0.08, Math.min(3.5, (105 - r1) / 32)),
              detune
            };
          }
          const alg = Math.max(1, Math.min(32, (bytes[base + 110] & 0x1F) + 1));
          const feedback = bytes[base + 111] & 0x07;
          let name = "";
          for (let c = 0; c < 10; c++) {
            const ch = bytes[base + 118 + c] & 0x7F;
            name += (ch >= 32 && ch <= 126) ? String.fromCharCode(ch) : " ";
          }
          parsed.push({ name: name.trim() ? name : ("SYX VMEM " + (v + 1)), alg, feedback, modDepth: 1.0, ops });
        }
        return parsed;
      }

      // VCED Single Voice Dump (163 bytes: F0 43 00 00 01 1B ... ck F7)
      if (bytes.length >= 161 && bytes[0] === 0xF0) {
        const start = 6;
        const ops = [];
        for (let opIdx = 5; opIdx >= 0; opIdx--) {
          ops[opIdx] = parseVcedOpBase(bytes, start + (5 - opIdx) * 21);
        }
        const alg = Math.max(1, Math.min(32, (bytes[start + 134] & 0x1F) + 1));
        const feedback = bytes[start + 135] & 0x07;
        let name = "";
        for (let c = 0; c < 10; c++) {
          const ch = bytes[start + 145 + c] & 0x7F;
          name += (ch >= 32 && ch <= 126) ? String.fromCharCode(ch) : " ";
        }
        parsed.push({ name: name.trim() ? name : "SYX VCED", alg, feedback, modDepth: 1.0, ops });
      }
      return parsed;
    }

    function buildDx7VcedSyxBytes(patch) {
      const p = patch || dx7Bank[activeDx7PatchIdx] || dx7Bank[0];
      const out = new Uint8Array(163);
      out[0] = 0xF0; out[1] = 0x43; out[2] = 0x00; out[3] = 0x00; out[4] = 0x01; out[5] = 0x1B;
      const body = out.subarray(6, 161);
      for (let rev = 0; rev < 6; rev++) {
        const opIdx = 5 - rev;
        const op = (p.ops && p.ops[opIdx]) ? p.ops[opIdx] : { ratio: 1, level: 0.8, dec: 1.0, detune: 0 };
        const off = rev * 21;
        body[off] = Math.max(20, Math.min(99, Math.round(105 - (op.dec || 1.0) * 32)));
        body[off + 1] = 85; body[off + 2] = 75; body[off + 3] = 65;
        body[off + 4] = 99; body[off + 5] = 99; body[off + 6] = 99; body[off + 7] = 0;
        body[off + 16] = Math.max(0, Math.min(99, Math.round((op.level ?? 0.8) * 99)));
        body[off + 17] = 0;
        const ratio = Math.max(0.5, op.ratio || 1.0);
        const coarse = ratio < 0.75 ? 0 : Math.min(31, Math.floor(ratio));
        const base = coarse === 0 ? 0.5 : coarse;
        const fine = Math.max(0, Math.min(99, Math.round(((ratio / base) - 1) * 100)));
        body[off + 18] = coarse & 0x1F;
        body[off + 19] = fine & 0x7F;
        body[off + 20] = Math.max(0, Math.min(14, Math.round((op.detune || 0) / 2 + 7)));
      }
      body[134] = Math.max(0, Math.min(31, (p.alg || 1) - 1));
      body[135] = Math.max(0, Math.min(7, p.feedback || 0));
      body[136] = 1; // Osc key sync
      const nm = ((p.name || "FM1 PATCH").padEnd(10, " ")).slice(0, 10);
      for (let c = 0; c < 10; c++) body[145 + c] = nm.charCodeAt(c) & 0x7F;
      let sum = 0;
      for (let i = 0; i < 155; i++) sum += body[i];
      out[161] = (-sum) & 0x7F;
      out[162] = 0xF7;
      return out;
    }

    function renderDx7AlgDiagram() {
      const box = document.getElementById("dx7-alg-diagram");
      const sel = document.getElementById("select-dx7-patch");
      const algInp = document.getElementById("input-dx7-alg");
      const fbInp = document.getElementById("input-dx7-fb");
      const patch = dx7Bank[activeDx7PatchIdx] || dx7Bank[0];
      if (!patch) return;
      if (sel) {
        if (sel.options.length !== dx7Bank.length) {
          sel.innerHTML = "";
          dx7Bank.forEach((pt, idx) => {
            const opt = document.createElement("option");
            opt.value = idx;
            opt.textContent = `${String(idx + 1).padStart(2, "0")}: ${pt.name.trim()} (A${pt.alg})`;
            sel.appendChild(opt);
          });
        }
        sel.value = String(activeDx7PatchIdx);
      }
      if (algInp) algInp.value = patch.alg;
      if (fbInp) fbInp.value = patch.feedback;
      const spec = DX7_ALGORITHMS[(patch.alg - 1 + 32) % 32];
      const edgesTxt = spec.edges.length ? spec.edges.map(e => `${e[0]}->${e[1]}`).join("  ") : "PARALLEL ADDITIVE (6 CARRIERS)";
      if (box) {
        box.textContent = `ALG ${String(spec.id).padStart(2, "0")}/32  OUT:[${spec.carriers.join(",")}]  FB:OP${spec.fbOp}(${patch.feedback})  |  ${edgesTxt}`;
      }
      if (tracks[0]) {
        tracks[0].preset = `DX7 ${patch.name.trim()} (ALG ${patch.alg})`;
      }
    }

    function playFmSynth(midiNote, velocity = 1.0, trackKeyNote = null, meta = null) {
      if (!audioCtx) initAudio();
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      const t = getAudioTime();
      const voiceNote = (trackKeyNote !== null) ? trackKeyNote : midiNote;
      const accentBoost = (meta && meta.accent) ? 1.25 : 1.0;
      const vel = Math.min(1.5, velocity * accentBoost);
      const effAtt = 0.002 * (typeof envAttackMult === "number" ? envAttackMult : 1.0);
      const effDec = (meta && meta.decSec !== undefined) ? meta.decSec : (1.6 * (typeof envDecayMult === "number" ? envDecayMult : 1.0));
      const prevFreq = (lastGlideFreqByTrack[0] > 0) ? lastGlideFreqByTrack[0] : freq;
      const glideSec = (meta && meta.slide) ? 0.06 : ((typeof globalGlideMs === "number" && globalGlideMs > 0) ? globalGlideMs / 1000 : 0);
      lastGlideFreqByTrack[0] = freq;

      const patch = (meta && meta.patchIdx !== undefined && dx7Bank[meta.patchIdx]) ? dx7Bank[meta.patchIdx] : (dx7Bank[activeDx7PatchIdx] || dx7Bank[0]);
      const algSpec = DX7_ALGORITHMS[((patch.alg || 5) - 1 + 32) % 32];
      const modBright = 1 + ((typeof globalModWheel === "number" ? globalModWheel : 0) * 0.85) + (meta && meta.accent ? 0.35 : 0);

      const opOscs = {};
      const allSrcs = [];
      let maxStopDur = effAtt + effDec + 0.14;

      for (let i = 1; i <= 6; i++) {
        const opSpec = (patch.ops && patch.ops[i - 1]) ? patch.ops[i - 1] : { ratio: 1, level: 0.7, dec: 1.0, detune: 0 };
        const osc = audioCtx.createOscillator();
        osc.type = "sine";
        const ratio = Math.max(0.25, opSpec.ratio || 1.0);
        const targetF = freq * ratio;
        if (glideSec > 0 && prevFreq !== freq) {
          osc.frequency.setValueAtTime(prevFreq * ratio, t);
          osc.frequency.exponentialRampToValueAtTime(targetF, t + glideSec);
        } else {
          osc.frequency.setValueAtTime(targetF, t);
        }
        const det = (opSpec.detune || 0) + (typeof globalPitchBendCents === "number" ? globalPitchBendCents : 0);
        if (det !== 0) osc.detune.setValueAtTime(det, t);
        opOscs[i] = { osc, spec: opSpec, targetF };
        allSrcs.push(osc);
      }

      // Connect DX7 modulator edges (srcOp -> dstOp.frequency)
      algSpec.edges.forEach(([srcNum, dstNum]) => {
        const srcObj = opOscs[srcNum];
        const dstObj = opOscs[dstNum];
        if (!srcObj || !dstObj) return;
        const modGain = audioCtx.createGain();
        const peakDev = dstObj.targetF * (srcObj.spec.level || 0.5) * 1.65 * (patch.modDepth || 1.0) * vel * modBright;
        const mDec = Math.max(0.08, (srcObj.spec.dec || 0.6) * (typeof envDecayMult === "number" ? envDecayMult : 1.0));
        modGain.gain.setValueAtTime(Math.max(1.0, peakDev), t);
        modGain.gain.exponentialRampToValueAtTime(Math.max(0.5, peakDev * 0.04), t + mDec);
        srcObj.osc.connect(modGain);
        modGain.connect(dstObj.osc.frequency);
      });

      // Operator Feedback loop on designated fbOp
      const fbLevel = (patch.feedback || 0) / 7;
      if (fbLevel > 0.05 && opOscs[algSpec.fbOp]) {
        const fbNode = opOscs[algSpec.fbOp];
        const fbGain = audioCtx.createGain();
        fbGain.gain.setValueAtTime(fbNode.targetF * fbLevel * 0.32, t);
        fbNode.osc.connect(fbGain);
        fbGain.connect(fbNode.osc.frequency);
      }

      // Carrier Summing Amp + Optional Per-Step Cutoff/Pan P-Locks
      const carrierGain = audioCtx.createGain();
      carrierGain.gain.setValueAtTime(0.0001, t);
      const peakAmp = (vel * 0.36) / Math.max(1, Math.sqrt(algSpec.carriers.length));
      carrierGain.gain.linearRampToValueAtTime(peakAmp, t + Math.max(0.002, effAtt));
      carrierGain.gain.exponentialRampToValueAtTime(0.001, t + effAtt + effDec);

      let outDest = getTrackBusNode(0);
      if (meta && meta.panLock !== null && meta.panLock !== undefined && audioCtx.createStereoPanner) {
        const pLock = audioCtx.createStereoPanner();
        pLock.pan.setValueAtTime(Math.max(-1, Math.min(1, meta.panLock)), t);
        pLock.connect(outDest);
        outDest = pLock;
      }
      if (meta && meta.cutoffLock !== null && meta.cutoffLock !== undefined) {
        const cFilt = audioCtx.createBiquadFilter();
        cFilt.type = "lowpass";
        const hz = 180 * Math.pow(80, Math.max(0, Math.min(100, meta.cutoffLock)) / 100);
        cFilt.frequency.setValueAtTime(Math.min(16000, hz), t);
        cFilt.Q.setValueAtTime(2.8, t);
        cFilt.connect(outDest);
        outDest = cFilt;
      }

      algSpec.carriers.forEach(cNum => {
        const cObj = opOscs[cNum];
        if (!cObj) return;
        const cIndGain = audioCtx.createGain();
        cIndGain.gain.setValueAtTime(Math.max(0.2, cObj.spec.level || 0.85), t);
        cObj.osc.connect(cIndGain);
        cIndGain.connect(carrierGain);
      });
      carrierGain.connect(outDest);

      allSrcs.forEach(o => { o.start(t); o.stop(t + maxStopDur); });

      const voice = new ActiveVoice({
        note: voiceNote,
        src: allSrcs,
        gain: carrierGain,
        stopTime: t + maxStopDur,
        releaseTime: 0.12
      });
      registerActiveVoice(voiceNote, voice, maxStopDur + 0.1, "fm");
    }

    // TB-303 Acid Bass with Sub-Oscillator & Resonant Envelope (with Slide + Accent)
    function play303Bass(midiNote, velocity = 1.0, trackKeyNote = null, meta = null) {
      if (!audioCtx) initAudio();
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      const t = getAudioTime();
      const voiceNote = (trackKeyNote !== null) ? trackKeyNote : midiNote;
      const prevFreq = (lastGlideFreqByTrack[1] > 0) ? lastGlideFreqByTrack[1] : freq;
      const doSlide = Boolean(meta && meta.slide) || (typeof globalGlideMs === "number" && globalGlideMs > 0);
      const slideSec = (meta && meta.slide) ? 0.065 : (typeof globalGlideMs === "number" ? globalGlideMs / 1000 : 0);
      lastGlideFreqByTrack[1] = freq;

      // Sawtooth core
      const osc = audioCtx.createOscillator();
      osc.type = "sawtooth";
      if (doSlide && slideSec > 0 && prevFreq !== freq) {
        osc.frequency.setValueAtTime(prevFreq, t);
        osc.frequency.exponentialRampToValueAtTime(freq, t + slideSec);
      } else {
        osc.frequency.setValueAtTime(freq, t);
      }

      // Warm Sub-Oscillator (-1 octave sine)
      const sub = audioCtx.createOscillator();
      sub.type = "sine";
      if (doSlide && slideSec > 0 && prevFreq !== freq) {
        sub.frequency.setValueAtTime(prevFreq * 0.5, t);
        sub.frequency.exponentialRampToValueAtTime(freq * 0.5, t + slideSec);
      } else {
        sub.frequency.setValueAtTime(freq * 0.5, t);
      }
      if (typeof globalPitchBendCents === "number" && globalPitchBendCents !== 0) {
        osc.detune.setValueAtTime(globalPitchBendCents, t);
        sub.detune.setValueAtTime(globalPitchBendCents, t);
      }

      const isAccent = Boolean(meta && meta.accent) || velocity >= 0.95;
      const modBoost = (typeof globalModWheel === "number" ? globalModWheel : 0);
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.setValueAtTime(Math.min(18, (isAccent ? 12.2 : 7.5) + modBoost * 4.5), t); // Responsive 303 accent resonance

      const decMult = (typeof envDecayMult === "number" ? envDecayMult : 1.0);
      const attMult = (typeof envAttackMult === "number" ? envAttackMult : 1.0);
      const effAtt = Math.max(0.001, 0.002 * attMult);
      const effVel = Math.min(1.5, velocity * (meta && meta.accent ? 1.25 : 1.0));

      const lockCutHz = (meta && meta.cutoffLock !== null && meta.cutoffLock !== undefined)
        ? 180 * Math.pow(65, Math.max(0, Math.min(100, meta.cutoffLock)) / 100)
        : null;
      const startCutoff = lockCutHz !== null
        ? Math.min(9500, lockCutHz)
        : Math.min(7800, (freq * (isAccent ? 8.5 : 4.8)) + (effVel * (isAccent ? 3200 : 1800)) + (modBoost * 2400));
      const filterDecay = (isAccent ? 0.34 : 0.22) * decMult;
      const ampDecay = (isAccent ? 0.42 : 0.28) * decMult;
      filter.frequency.setValueAtTime(startCutoff, t);
      filter.frequency.exponentialRampToValueAtTime(Math.max(105, freq * 1.4), t + filterDecay);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(effVel * 0.42, t + effAtt);
      gain.gain.exponentialRampToValueAtTime(0.001, t + effAtt + ampDecay);

      const subGain = audioCtx.createGain();
      subGain.gain.setValueAtTime(0.0001, t);
      subGain.gain.linearRampToValueAtTime(effVel * 0.28, t + effAtt);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + effAtt + ampDecay);

      let outBus = getTrackBusNode(1);
      if (meta && meta.panLock !== null && meta.panLock !== undefined && audioCtx.createStereoPanner) {
        const pLock = audioCtx.createStereoPanner();
        pLock.pan.setValueAtTime(Math.max(-1, Math.min(1, meta.panLock)), t);
        pLock.connect(outBus);
        outBus = pLock;
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(outBus);

      sub.connect(subGain);
      subGain.connect(outBus);

      const stopDur = effAtt + Math.max(0.45 * decMult, ampDecay + 0.08);
      osc.start(t); sub.start(t);
      osc.stop(t + stopDur); sub.stop(t + stopDur);

      const voice = new ActiveVoice({
        note: voiceNote,
        src: [osc, sub],
        gain: [gain, subGain],
        filter,
        stopTime: t + stopDur,
        releaseTime: 0.08
      });
      registerActiveVoice(voiceNote, voice, stopDur + 0.05, "bass303");
    }

    // ==========================================
    // ROLAND TR-808 ANALOG SYNTHESIS ENGINE
    // Complete 11-Instrument Authentic Circuit Emulation
    // ==========================================
    let noiseBuffer808 = null;
    function get808NoiseBuffer() {
      if (noiseBuffer808) return noiseBuffer808;
      if (!audioCtx) return null;
      const len = Math.floor(audioCtx.sampleRate * 2.0);
      noiseBuffer808 = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
      const data = noiseBuffer808.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      return noiseBuffer808;
    }

    // 808 Metallic 6-Oscillator Cluster (Schmitt-Trigger Inverter Matrix)
    // Tuned frequencies from Roland TR-808 service manual:
    // 205.3 Hz, 304.4 Hz, 369.6 Hz, 422.3 Hz, 538.7 Hz, 800.0 Hz
    function create808MetalCluster(t, duration) {
      const freqs = [205.3, 304.4, 369.6, 422.3, 538.7, 800.0];
      const clusterGain = audioCtx.createGain();
      clusterGain.gain.setValueAtTime(0.18, t);

      freqs.forEach(f => {
        const osc = audioCtx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(f, t);
        osc.connect(clusterGain);
        osc.start(t);
        osc.stop(t + duration);
      });
      return clusterGain;
    }

    // Universal Mapper: MIDI notes, Instrument Strings, or Numbers -> 808 Type (1-11)
    function resolve808DrumType(input) {
      if (typeof input === "string") {
        const s = input.toUpperCase();
        if (s.includes("BD") || s.includes("KICK")) return 1;
        if (s.includes("SD") || s.includes("SNARE")) return 2;
        if (s.includes("CH") || s.includes("CLOSED")) return 3;
        if (s.includes("OH") || s.includes("OPEN")) return 4;
        if (s.includes("CP") || s.includes("CLAP")) return 5;
        if (s.includes("CB") || s.includes("COWBELL")) return 6;
        if (s.includes("LT") || s.includes("LOW TOM")) return 7;
        if (s.includes("MT") || s.includes("MID TOM")) return 8;
        if (s.includes("HT") || s.includes("HI TOM")) return 9;
        if (s.includes("RS") || s.includes("RIM")) return 10;
        if (s.includes("CY") || s.includes("CYMBAL")) return 11;
      }

      const n = parseInt(input);
      if (isNaN(n)) return 1;

      // Direct 1-11 enum
      if (n >= 1 && n <= 11) return n;

      // Standard General MIDI mapping (Channel 10 percussion standard)
      if (n === 35 || n === 36) return 1;  // Bass Drum 1 & 2
      if (n === 37) return 10;             // Side Stick / Rimshot
      if (n === 38 || n === 40) return 2;  // Snare Drum 1 & 2
      if (n === 39) return 5;              // Hand Clap
      if (n === 41 || n === 43) return 7;  // Low Floor Tom / Low Tom
      if (n === 42 || n === 44) return 3;  // Closed Hi-Hat / Pedal Hat
      if (n === 45 || n === 47) return 8;  // Mid Tom / Low-Mid Tom
      if (n === 46) return 4;              // Open Hi-Hat
      if (n === 48 || n === 50) return 9;  // High-Mid Tom / High Tom
      if (n === 49 || n === 57) return 11; // Crash Cymbal 1 & 2
      if (n === 51 || n === 59) return 11; // Ride Cymbal 1 & 2
      if (n === 56) return 6;              // Cowbell

      // Octave chromatic keyboard mapping (Piano keys C through B)
      const pitchClass = ((n % 12) + 12) % 12;
      const chromaticMap = [
        1,  // C:  808 Bass Drum (Sub Boom Kick)
        10, // C#: 808 Rimshot
        2,  // D:  808 Snare Drum
        5,  // D#: 808 Hand Clap
        7,  // E:  808 Low Tom
        3,  // F:  808 Closed Hi-Hat
        8,  // F#: 808 Mid Tom
        4,  // G:  808 Open Hi-Hat
        9,  // G#: 808 High Tom
        11, // A:  808 Cymbal
        6,  // A#: 808 Cowbell
        3   // B:  808 Closed Hi-Hat
      ];
      return chromaticMap[pitchClass];
    }

    let active808OpenHatGain = null;
    let active808KickOsc = null;
    let active808KickGain = null;
    let SaturationCurve808 = null;

    function get808SaturationCurve() {
      if (SaturationCurve808) return SaturationCurve808;
      const samples = 2048;
      const curve = new Float32Array(samples);
      for (let i = 0; i < samples; i++) {
        const x = (i * 2) / (samples - 1) - 1;
        curve[i] = Math.tanh(1.5 * x);
      }
      SaturationCurve808 = curve;
      return SaturationCurve808;
    }

    function play808Drum(typeInput, velocity = 1.0) {
      if (!audioCtx) initAudio();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = getAudioTime();
      const type = resolve808DrumType(typeInput);
      const vel = Math.max(0.1, Math.min(1.5, velocity));

      // 1: 808 BASS DRUM (Bridged-T Analog Sub Boom with Saturated Punch)
      if (type === 1) {
        triggerSidechainDuck(t);
        if (active808KickGain) {
          try {
            active808KickGain.gain.cancelScheduledValues(t);
            active808KickGain.gain.setValueAtTime(Math.max(0.0001, active808KickGain.gain.value), t);
            active808KickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.008);
          } catch (e) {}
        }
        if (active808KickOsc) {
          try { active808KickOsc.stop(t + 0.01); } catch (e) {}
        }

        const osc = audioCtx.createOscillator();
        const shaper = audioCtx.createWaveShaper();
        shaper.curve = get808SaturationCurve();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(138, t);
        osc.frequency.exponentialRampToValueAtTime(58, t + 0.018);
        osc.frequency.exponentialRampToValueAtTime(46.2, t + 0.45);

        // Crisp 4ms beater transient click
        const click = audioCtx.createOscillator();
        const clickGain = audioCtx.createGain();
        click.type = "triangle";
        click.frequency.setValueAtTime(950, t);
        click.frequency.exponentialRampToValueAtTime(140, t + 0.005);
        clickGain.gain.setValueAtTime(vel * 0.28, t);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.006);
        click.connect(clickGain);
        clickGain.connect(getTrackBusNode(2));
        click.start(t); click.stop(t + 0.01);

        // Saturated 808 sub tail
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(vel * 0.92, t + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.62);

        osc.connect(shaper);
        shaper.connect(gain);
        gain.connect(getTrackBusNode(2));
        osc.start(t); osc.stop(t + 0.66);

        active808KickOsc = osc;
        active808KickGain = gain;

      // 2: 808 SNARE DRUM (Tight Dual Bridged-T Shell + Crisp High-Passed Wires)
      } else if (type === 2) {
        const t1 = audioCtx.createOscillator();
        const t2 = audioCtx.createOscillator();
        const toneGain = audioCtx.createGain();
        t1.frequency.setValueAtTime(210, t);
        t1.frequency.exponentialRampToValueAtTime(180, t + 0.012);
        t2.frequency.setValueAtTime(355, t);
        t2.frequency.exponentialRampToValueAtTime(330, t + 0.012);

        toneGain.gain.setValueAtTime(vel * 0.38, t);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.10);
        t1.connect(toneGain); t2.connect(toneGain);
        toneGain.connect(getTrackBusNode(2));
        t1.start(t); t2.start(t);
        t1.stop(t + 0.12); t2.stop(t + 0.12);

        // Crisp high-passed snare wires with upper presence peak
        const noiseBuf = get808NoiseBuffer();
        if (noiseBuf) {
          const noise = audioCtx.createBufferSource();
          noise.buffer = noiseBuf;
          const hp = audioCtx.createBiquadFilter();
          hp.type = "highpass";
          hp.frequency.setValueAtTime(2400, t);

          const peak = audioCtx.createBiquadFilter();
          peak.type = "peaking";
          peak.frequency.setValueAtTime(4500, t);
          peak.Q.setValueAtTime(1.2, t);
          peak.gain.setValueAtTime(3.0, t);

          const noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(vel * 0.48, t);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);

          noise.connect(hp);
          hp.connect(peak);
          peak.connect(noiseGain);
          noiseGain.connect(getTrackBusNode(2));
          noise.start(t);
          noise.stop(t + 0.20);
        }

      // 3: 808 CLOSED HI-HAT (CH — Chokes Active Open Hi-Hat)
      } else if (type === 3) {
        if (active808OpenHatGain) {
          try {
            if (active808OpenHatGain.gain.cancelAndHoldAtTime) {
              active808OpenHatGain.gain.cancelAndHoldAtTime(t);
            } else {
              active808OpenHatGain.gain.cancelScheduledValues(t);
              active808OpenHatGain.gain.setValueAtTime(Math.max(0.0001, active808OpenHatGain.gain.value), t);
            }
            active808OpenHatGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.010);
          } catch (e) {}
          active808OpenHatGain = null;
        }

        const cluster = create808MetalCluster(t, 0.075);
        const bp = audioCtx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(7000, t);
        bp.Q.setValueAtTime(0.7, t);

        const hp = audioCtx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(5400, t);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.005, t);
        gain.gain.linearRampToValueAtTime(vel * 1.45, t + 0.0015);
        gain.gain.exponentialRampToValueAtTime(vel * 0.28, t + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.068);

        cluster.connect(bp);
        bp.connect(hp);
        hp.connect(gain);
        gain.connect(getTrackBusNode(2));

      // 4: 808 OPEN HI-HAT (OH — Gate-Hold + RC Decay, Registered for CH Choke)
      } else if (type === 4) {
        if (active808OpenHatGain) {
          try {
            if (active808OpenHatGain.gain.cancelAndHoldAtTime) {
              active808OpenHatGain.gain.cancelAndHoldAtTime(t);
            } else {
              active808OpenHatGain.gain.cancelScheduledValues(t);
              active808OpenHatGain.gain.setValueAtTime(Math.max(0.0001, active808OpenHatGain.gain.value), t);
            }
            active808OpenHatGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.010);
          } catch (e) {}
        }

        const cluster = create808MetalCluster(t, 0.56);
        const bp = audioCtx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(7000, t);
        bp.Q.setValueAtTime(0.65, t);

        const hp = audioCtx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(4800, t);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.005, t);
        gain.gain.linearRampToValueAtTime(vel * 1.35, t + 0.0018);
        gain.gain.linearRampToValueAtTime(vel * 0.92, t + 0.085);
        gain.gain.setTargetAtTime(0.0001, t + 0.085, 0.085);

        cluster.connect(bp);
        bp.connect(hp);
        hp.connect(gain);
        gain.connect(getTrackBusNode(2));
        active808OpenHatGain = gain;

      // 5: 808 HAND CLAP (CP — Discrete 3-Strike Micro-Flam + Reverberant Tail)
      } else if (type === 5) {
        const noiseBuf = get808NoiseBuffer();
        if (noiseBuf) {
          const bp = audioCtx.createBiquadFilter();
          bp.type = "bandpass";
          bp.frequency.setValueAtTime(1350, t);
          bp.Q.setValueAtTime(1.2, t);

          const peak = audioCtx.createBiquadFilter();
          peak.type = "peaking";
          peak.frequency.setValueAtTime(2800, t);
          peak.Q.setValueAtTime(1.1, t);
          peak.gain.setValueAtTime(3.0, t);

          const noise = audioCtx.createBufferSource();
          noise.buffer = noiseBuf;
          noise.connect(bp);
          bp.connect(peak);

          // 3 distinct crisp micro-flam strikes
          [0, 0.011, 0.022].forEach((offset, idx) => {
            const burstGain = audioCtx.createGain();
            const burstLevel = vel * (idx === 2 ? 0.46 : 0.38);
            burstGain.gain.setValueAtTime(0.0001, t + offset);
            burstGain.gain.linearRampToValueAtTime(burstLevel, t + offset + 0.001);
            burstGain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.009);
            peak.connect(burstGain);
            burstGain.connect(getTrackBusNode(2));
          });

          // Diffused reverberant tail
          const tailGain = audioCtx.createGain();
          tailGain.gain.setValueAtTime(0.0001, t + 0.028);
          tailGain.gain.linearRampToValueAtTime(vel * 0.34, t + 0.032);
          tailGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
          peak.connect(tailGain);
          tailGain.connect(getTrackBusNode(2));

          noise.start(t);
          noise.stop(t + 0.28);
        }

      // 6: 808 COWBELL (CB — 540/800 Hz Dual Square Two-Stage Decay)
      } else if (type === 6) {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        osc1.type = "square";
        osc2.type = "square";
        osc1.frequency.setValueAtTime(540, t);
        osc2.frequency.setValueAtTime(800, t);

        const bp = audioCtx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(720, t);
        bp.Q.setValueAtTime(2.4, t);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(vel * 0.65, t);
        gain.gain.exponentialRampToValueAtTime(vel * 0.28, t + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);

        osc1.connect(bp);
        osc2.connect(bp);
        bp.connect(gain);
        gain.connect(getTrackBusNode(2));

        osc1.start(t); osc2.start(t);
        osc1.stop(t + 0.27); osc2.stop(t + 0.27);

      // 7: 808 LOW TOM (LT)
      } else if (type === 7) {
        const osc = audioCtx.createOscillator();
        const shaper = audioCtx.createWaveShaper();
        shaper.curve = get808SaturationCurve();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(135, t);
        osc.frequency.exponentialRampToValueAtTime(72, t + 0.014);
        osc.frequency.exponentialRampToValueAtTime(64, t + 0.28);

        gain.gain.setValueAtTime(vel * 0.72, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);

        osc.connect(shaper);
        shaper.connect(gain);
        gain.connect(getTrackBusNode(2));
        osc.start(t); osc.stop(t + 0.40);

      // 8: 808 MID TOM (MT)
      } else if (type === 8) {
        const osc = audioCtx.createOscillator();
        const shaper = audioCtx.createWaveShaper();
        shaper.curve = get808SaturationCurve();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(195, t);
        osc.frequency.exponentialRampToValueAtTime(112, t + 0.014);
        osc.frequency.exponentialRampToValueAtTime(98, t + 0.24);

        gain.gain.setValueAtTime(vel * 0.68, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);

        osc.connect(shaper);
        shaper.connect(gain);
        gain.connect(getTrackBusNode(2));
        osc.start(t); osc.stop(t + 0.36);

      // 9: 808 HIGH TOM (HT)
      } else if (type === 9) {
        const osc = audioCtx.createOscillator();
        const shaper = audioCtx.createWaveShaper();
        shaper.curve = get808SaturationCurve();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(275, t);
        osc.frequency.exponentialRampToValueAtTime(165, t + 0.014);
        osc.frequency.exponentialRampToValueAtTime(145, t + 0.20);

        gain.gain.setValueAtTime(vel * 0.65, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

        osc.connect(shaper);
        shaper.connect(gain);
        gain.connect(getTrackBusNode(2));
        osc.start(t); osc.stop(t + 0.32);

      // 10: 808 RIM SHOT (RS — Dual Bridged-T 480 + 1680 Hz Click)
      } else if (type === 10) {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const osc2Gain = audioCtx.createGain();
        osc1.type = "triangle";
        osc2.type = "square";
        osc1.frequency.setValueAtTime(480, t);
        osc2.frequency.setValueAtTime(1680, t);
        osc2Gain.gain.setValueAtTime(0.55, t);

        const bp = audioCtx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(1550, t);
        bp.Q.setValueAtTime(2.0, t);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(vel * 1.35, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.032);

        osc1.connect(bp);
        osc2.connect(osc2Gain);
        osc2Gain.connect(bp);
        bp.connect(gain);
        gain.connect(getTrackBusNode(2));
        osc1.start(t); osc2.start(t);
        osc1.stop(t + 0.045); osc2.stop(t + 0.045);

      // 11: 808 CYMBAL (CY)
      } else if (type === 11) {
        const cluster = create808MetalCluster(t, 1.35);
        const bp = audioCtx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(6600, t);
        bp.Q.setValueAtTime(0.60, t);

        const hp = audioCtx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.setValueAtTime(4600, t);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.005, t);
        gain.gain.linearRampToValueAtTime(vel * 1.25, t + 0.002);
        gain.gain.setTargetAtTime(0.0001, t + 0.06, 0.26);

        cluster.connect(bp);
        bp.connect(hp);
        hp.connect(gain);
        gain.connect(getTrackBusNode(2));
      }
    }

    // ==========================================
    // EXPANDED CUSTOM FIRMWARE DSP ENGINES (TRK 5-8)
    // Track 4: VA Poly (OberVave/FM-106), Track 5: TR-909,
    // Track 6: C64 SID 6581, Track 7: Breakbeat Slicer & Granular Cloud
    // ==========================================
