import React, { Component } from 'react'
import './Spinner.css'
import {random, shuffle, concat, sample, clone} from 'lodash'
import { Button } from '@blueprintjs/core'

const items = [
  {
    "name": "AK-47 | Overdrive (Factory New)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-factory-new-600.png"
    },
    "suggested_price": 28145,
    "suggested_price_floor": 23252,
    "id": "100_1",
    "wearid": "1",
    "sku": "100"
    },
    {
    "name": "AK-47 | Overdrive (Minimal Wear)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-minimal-wear-600.png"
    },
    "suggested_price": 11368,
    "suggested_price_floor": 10696,
    "id": "100_2",
    "wearid": "2",
    "sku": "100"
    },
    {
    "name": "AK-47 | Overdrive (Field-Tested)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-field-tested-600.png"
    },
    "suggested_price": 7689,
    "suggested_price_floor": 6952,
    "id": "100_3",
    "wearid": "3",
    "sku": "100"
    },
    {
    "name": "AK-47 | Overdrive (Well-Worn)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-well-worn-600.png"
    },
    "suggested_price": 7462,
    "suggested_price_floor": 6257,
    "id": "100_4",
    "wearid": "4",
    "sku": "100"
    },
    {
    "name": "AK-47 | Overdrive (Battle-Scarred)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ak-47-overdrive-battle-scarred-600.png"
    },
    "suggested_price": 6305,
    "suggested_price_floor": 5506,
    "id": "100_5",
    "wearid": "5",
    "sku": "100"
    },
    {
    "name": "M4A4 | Ice Chamber (Factory New)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-factory-new-600.png"
    },
    "suggested_price": 21589,
    "suggested_price_floor": 17317,
    "id": "101_1",
    "wearid": "1",
    "sku": "101"
    },
    {
    "name": "M4A4 | Ice Chamber (Minimal Wear)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-minimal-wear-600.png"
    },
    "suggested_price": 12108,
    "suggested_price_floor": 10217,
    "id": "101_2",
    "wearid": "2",
    "sku": "101"
    },
    {
    "name": "M4A4 | Ice Chamber (Field-Tested)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-field-tested-600.png"
    },
    "suggested_price": 8969,
    "suggested_price_floor": 8071,
    "id": "101_3",
    "wearid": "3",
    "sku": "101"
    },
    {
    "name": "M4A4 | Ice Chamber (Well-Worn)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-well-worn-600.png"
    },
    "suggested_price": 7810,
    "suggested_price_floor": 7022,
    "id": "101_4",
    "wearid": "4",
    "sku": "101"
    },
    {
    "name": "M4A4 | Ice Chamber (Battle-Scarred)",
    "category": "Covert Rifle",
    "rarity": "Covert",
    "type": "Rifle",
    "paint_index": null,
    "color": "#eb4b4b",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/m4a4-ice-chamber-battle-scarred-600.png"
    },
    "suggested_price": 7388,
    "suggested_price_floor": 6671,
    "id": "101_5",
    "wearid": "5",
    "sku": "101"
    },
    {
    "name": "SG 553 | Shuilong (Factory New)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-factory-new-600.png"
    },
    "suggested_price": 2412,
    "suggested_price_floor": 1985,
    "id": "102_1",
    "wearid": "1",
    "sku": "102"
    },
    {
    "name": "SG 553 | Shuilong (Minimal Wear)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-minimal-wear-600.png"
    },
    "suggested_price": 935,
    "suggested_price_floor": 933,
    "id": "102_2",
    "wearid": "2",
    "sku": "102"
    },
    {
    "name": "SG 553 | Shuilong (Field-Tested)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-field-tested-600.png"
    },
    "suggested_price": 774,
    "suggested_price_floor": 774,
    "id": "102_3",
    "wearid": "3",
    "sku": "102"
    },
    {
    "name": "SG 553 | Shuilong (Well-Worn)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-well-worn-600.png"
    },
    "suggested_price": 697,
    "suggested_price_floor": 697,
    "id": "102_4",
    "wearid": "4",
    "sku": "102"
    },
    {
    "name": "SG 553 | Shuilong (Battle-Scarred)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/sg-553-shuilong-battle-scarred-600.png"
    },
    "suggested_price": 627,
    "suggested_price_floor": 627,
    "id": "102_5",
    "wearid": "5",
    "sku": "102"
    },
    {
    "name": "FAMAS | Booster (Factory New)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/famas-booster-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/famas-booster-factory-new-600.png"
    },
    "suggested_price": 2622,
    "suggested_price_floor": 2155,
    "id": "103_1",
    "wearid": "1",
    "sku": "103"
    },
    {
    "name": "FAMAS | Booster (Minimal Wear)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/famas-booster-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/famas-booster-minimal-wear-600.png"
    },
    "suggested_price": 1108,
    "suggested_price_floor": 1013,
    "id": "103_2",
    "wearid": "2",
    "sku": "103"
    },
    {
    "name": "FAMAS | Booster (Field-Tested)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/famas-booster-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/famas-booster-field-tested-600.png"
    },
    "suggested_price": 841,
    "suggested_price_floor": 841,
    "id": "103_3",
    "wearid": "3",
    "sku": "103"
    },
    {
    "name": "FAMAS | Booster (Well-Worn)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/famas-booster-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/famas-booster-well-worn-600.png"
    },
    "suggested_price": 757,
    "suggested_price_floor": 757,
    "id": "103_4",
    "wearid": "4",
    "sku": "103"
    },
    {
    "name": "FAMAS | Booster (Battle-Scarred)",
    "category": "Classified Rifle",
    "rarity": "Classified",
    "type": "Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/famas-booster-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/famas-booster-battle-scarred-600.png"
    },
    "suggested_price": 681,
    "suggested_price_floor": 681,
    "id": "103_5",
    "wearid": "5",
    "sku": "103"
    },
    {
    "name": "SSG 08 | Pink Swirl (Factory New)",
    "category": "Classified Sniper Rifle",
    "rarity": "Classified",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-factory-new-600.png"
    },
    "suggested_price": 1728,
    "suggested_price_floor": 1532,
    "id": "104_1",
    "wearid": "1",
    "sku": "104"
    },
    {
    "name": "SSG 08 | Pink Swirl (Minimal Wear)",
    "category": "Classified Sniper Rifle",
    "rarity": "Classified",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-minimal-wear-600.png"
    },
    "suggested_price": 986,
    "suggested_price_floor": 919,
    "id": "104_2",
    "wearid": "2",
    "sku": "104"
    },
    {
    "name": "SSG 08 | Pink Swirl (Field-Tested)",
    "category": "Classified Sniper Rifle",
    "rarity": "Classified",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-field-tested-600.png"
    },
    "suggested_price": 397,
    "suggested_price_floor": 395,
    "id": "104_3",
    "wearid": "3",
    "sku": "104"
    },
    {
    "name": "SSG 08 | Pink Swirl (Well-Worn)",
    "category": "Classified Sniper Rifle",
    "rarity": "Classified",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-well-worn-600.png"
    },
    "suggested_price": 514,
    "suggested_price_floor": 514,
    "id": "104_4",
    "wearid": "4",
    "sku": "104"
    },
    {
    "name": "SSG 08 | Pink Swirl (Battle-Scarred)",
    "category": "Classified Sniper Rifle",
    "rarity": "Classified",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#d32ee6",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/ssg-08-pink-swirl-battle-scarred-600.png"
    },
    "suggested_price": 365,
    "suggested_price_floor": 365,
    "id": "104_5",
    "wearid": "5",
    "sku": "104"
    },
    {
    "name": "MAG-7 | Gold Digger (Factory New)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-factory-new-600.png"
    },
    "suggested_price": 687,
    "suggested_price_floor": 687,
    "id": "105_1",
    "wearid": "1",
    "sku": "105"
    },
    {
    "name": "MAG-7 | Gold Digger (Minimal Wear)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-minimal-wear-600.png"
    },
    "suggested_price": 316,
    "suggested_price_floor": 316,
    "id": "105_2",
    "wearid": "2",
    "sku": "105"
    },
    {
    "name": "MAG-7 | Gold Digger (Field-Tested)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-field-tested-600.png"
    },
    "suggested_price": 202,
    "suggested_price_floor": 202,
    "id": "105_3",
    "wearid": "3",
    "sku": "105"
    },
    {
    "name": "MAG-7 | Gold Digger (Well-Worn)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-well-worn-600.png"
    },
    "suggested_price": 174,
    "suggested_price_floor": 174,
    "id": "105_4",
    "wearid": "4",
    "sku": "105"
    },
    {
    "name": "MAG-7 | Gold Digger (Battle-Scarred)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mag-7-gold-digger-battle-scarred-600.png"
    },
    "suggested_price": 150,
    "suggested_price_floor": 150,
    "id": "105_5",
    "wearid": "5",
    "sku": "105"
    },
    {
    "name": "P90 | Critical (Factory New)",
    "category": "Restricted SMG",
    "rarity": "Restricted",
    "type": "SMG",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p90-critical-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p90-critical-factory-new-600.png"
    },
    "suggested_price": 345,
    "suggested_price_floor": 345,
    "id": "106_1",
    "wearid": "1",
    "sku": "106"
    },
    {
    "name": "P90 | Critical (Minimal Wear)",
    "category": "Restricted SMG",
    "rarity": "Restricted",
    "type": "SMG",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p90-critical-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p90-critical-minimal-wear-600.png"
    },
    "suggested_price": 213,
    "suggested_price_floor": 190,
    "id": "106_2",
    "wearid": "2",
    "sku": "106"
    },
    {
    "name": "P90 | Critical (Field-Tested)",
    "category": "Restricted SMG",
    "rarity": "Restricted",
    "type": "SMG",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p90-critical-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p90-critical-field-tested-600.png"
    },
    "suggested_price": 123,
    "suggested_price_floor": 121,
    "id": "106_3",
    "wearid": "3",
    "sku": "106"
    },
    {
    "name": "P90 | Critical (Well-Worn)",
    "category": "Restricted SMG",
    "rarity": "Restricted",
    "type": "SMG",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p90-critical-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p90-critical-well-worn-600.png"
    },
    "suggested_price": 148,
    "suggested_price_floor": 148,
    "id": "106_4",
    "wearid": "4",
    "sku": "106"
    },
    {
    "name": "P90 | Critical (Battle-Scarred)",
    "category": "Restricted SMG",
    "rarity": "Restricted",
    "type": "SMG",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p90-critical-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p90-critical-battle-scarred-600.png"
    },
    "suggested_price": 261,
    "suggested_price_floor": 261,
    "id": "106_5",
    "wearid": "5",
    "sku": "106"
    },
    {
    "name": "XM1014 | Poison Target (Factory New)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-factory-new-600.png"
    },
    "suggested_price": 418,
    "suggested_price_floor": 418,
    "id": "107_1",
    "wearid": "1",
    "sku": "107"
    },
    {
    "name": "XM1014 | Poison Target (Minimal Wear)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-minimal-wear-600.png"
    },
    "suggested_price": 192,
    "suggested_price_floor": 192,
    "id": "107_2",
    "wearid": "2",
    "sku": "107"
    },
    {
    "name": "XM1014 | Poison Target (Field-Tested)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-field-tested-600.png"
    },
    "suggested_price": 119,
    "suggested_price_floor": 119,
    "id": "107_3",
    "wearid": "3",
    "sku": "107"
    },
    {
    "name": "XM1014 | Poison Target (Well-Worn)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-well-worn-600.png"
    },
    "suggested_price": 107,
    "suggested_price_floor": 107,
    "id": "107_4",
    "wearid": "4",
    "sku": "107"
    },
    {
    "name": "XM1014 | Poison Target (Battle-Scarred)",
    "category": "Restricted Shotgun",
    "rarity": "Restricted",
    "type": "Shotgun",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/xm1014-poison-target-battle-scarred-600.png"
    },
    "suggested_price": 97,
    "suggested_price_floor": 97,
    "id": "107_5",
    "wearid": "5",
    "sku": "107"
    },
    {
    "name": "Tec-9 | Critical (Factory New)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-factory-new-600.png"
    },
    "suggested_price": 867,
    "suggested_price_floor": 856,
    "id": "108_1",
    "wearid": "1",
    "sku": "108"
    },
    {
    "name": "Tec-9 | Critical (Minimal Wear)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-minimal-wear-600.png"
    },
    "suggested_price": 505,
    "suggested_price_floor": 505,
    "id": "108_2",
    "wearid": "2",
    "sku": "108"
    },
    {
    "name": "Tec-9 | Critical (Field-Tested)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-field-tested-600.png"
    },
    "suggested_price": 338,
    "suggested_price_floor": 338,
    "id": "108_3",
    "wearid": "3",
    "sku": "108"
    },
    {
    "name": "Tec-9 | Critical (Well-Worn)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-well-worn-600.png"
    },
    "suggested_price": 660,
    "suggested_price_floor": 660,
    "id": "108_4",
    "wearid": "4",
    "sku": "108"
    },
    {
    "name": "Tec-9 | Critical (Battle-Scarred)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/tec-9-critical-battle-scarred-600.png"
    },
    "suggested_price": 561,
    "suggested_price_floor": 561,
    "id": "108_5",
    "wearid": "5",
    "sku": "108"
    },
    {
    "name": "P250 | Infinity (Factory New)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-factory-new-600.png"
    },
    "suggested_price": 1052,
    "suggested_price_floor": 963,
    "id": "109_1",
    "wearid": "1",
    "sku": "109"
    },
    {
    "name": "P250 | Infinity (Minimal Wear)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-minimal-wear-600.png"
    },
    "suggested_price": 501,
    "suggested_price_floor": 501,
    "id": "109_2",
    "wearid": "2",
    "sku": "109"
    },
    {
    "name": "P250 | Infinity (Field-Tested)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-field-tested-600.png"
    },
    "suggested_price": 275,
    "suggested_price_floor": 275,
    "id": "109_3",
    "wearid": "3",
    "sku": "109"
    },
    {
    "name": "P250 | Infinity (Well-Worn)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-well-worn-600.png"
    },
    "suggested_price": 130,
    "suggested_price_floor": 127,
    "id": "109_4",
    "wearid": "4",
    "sku": "109"
    },
    {
    "name": "P250 | Infinity (Battle-Scarred)",
    "category": "Restricted Pistol",
    "rarity": "Restricted",
    "type": "Pistol",
    "paint_index": null,
    "color": "#8847ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/p250-infinity-battle-scarred-600.png"
    },
    "suggested_price": 108,
    "suggested_price_floor": 108,
    "id": "109_5",
    "wearid": "5",
    "sku": "109"
    },
    {
    "name": "Desert Eagle | Red Viper (Factory New)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-factory-new-600.png"
    },
    "suggested_price": 40,
    "suggested_price_floor": 30,
    "id": "110_1",
    "wearid": "1",
    "sku": "110"
    },
    {
    "name": "Desert Eagle | Red Viper (Minimal Wear)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-minimal-wear-600.png"
    },
    "suggested_price": 31,
    "suggested_price_floor": 18,
    "id": "110_2",
    "wearid": "2",
    "sku": "110"
    },
    {
    "name": "Desert Eagle | Red Viper (Field-Tested)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-field-tested-600.png"
    },
    "suggested_price": 21,
    "suggested_price_floor": 16,
    "id": "110_3",
    "wearid": "3",
    "sku": "110"
    },
    {
    "name": "Desert Eagle | Red Viper (Well-Worn)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-well-worn-600.png"
    },
    "suggested_price": 37,
    "suggested_price_floor": 25,
    "id": "110_4",
    "wearid": "4",
    "sku": "110"
    },
    {
    "name": "Desert Eagle | Red Viper (Battle-Scarred)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/desert-eagle-red-viper-battle-scarred-600.png"
    },
    "suggested_price": 23,
    "suggested_price_floor": 23,
    "id": "110_5",
    "wearid": "5",
    "sku": "110"
    },
    {
    "name": "MP7 | Redact (Factory New)",
    "category": "Mil-Spec SMG",
    "rarity": "Mil-Spec",
    "type": "SMG",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-factory-new-600.png"
    },
    "suggested_price": 62,
    "suggested_price_floor": 56,
    "id": "111_1",
    "wearid": "1",
    "sku": "111"
    },
    {
    "name": "MP7 | Redact (Minimal Wear)",
    "category": "Mil-Spec SMG",
    "rarity": "Mil-Spec",
    "type": "SMG",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-minimal-wear-600.png"
    },
    "suggested_price": 34,
    "suggested_price_floor": 34,
    "id": "111_2",
    "wearid": "2",
    "sku": "111"
    },
    {
    "name": "MP7 | Redact (Field-Tested)",
    "category": "Mil-Spec SMG",
    "rarity": "Mil-Spec",
    "type": "SMG",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-field-tested-600.png"
    },
    "suggested_price": 30,
    "suggested_price_floor": 30,
    "id": "111_3",
    "wearid": "3",
    "sku": "111"
    },
    {
    "name": "MP7 | Redact (Well-Worn)",
    "category": "Mil-Spec SMG",
    "rarity": "Mil-Spec",
    "type": "SMG",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-well-worn-600.png"
    },
    "suggested_price": 27,
    "suggested_price_floor": 27,
    "id": "111_4",
    "wearid": "4",
    "sku": "111"
    },
    {
    "name": "MP7 | Redact (Battle-Scarred)",
    "category": "Mil-Spec SMG",
    "rarity": "Mil-Spec",
    "type": "SMG",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/mp7-redact-battle-scarred-600.png"
    },
    "suggested_price": 24,
    "suggested_price_floor": 24,
    "id": "111_5",
    "wearid": "5",
    "sku": "111"
    },
    {
    "name": "Dual Berettas | Trigger Happy (Factory New)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-factory-new-600.png"
    },
    "suggested_price": 22,
    "suggested_price_floor": 15,
    "id": "112_1",
    "wearid": "1",
    "sku": "112"
    },
    {
    "name": "Dual Berettas | Trigger Happy (Minimal Wear)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-minimal-wear-600.png"
    },
    "suggested_price": 13,
    "suggested_price_floor": 9,
    "id": "112_2",
    "wearid": "2",
    "sku": "112"
    },
    {
    "name": "Dual Berettas | Trigger Happy (Field-Tested)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-field-tested-600.png"
    },
    "suggested_price": 6,
    "suggested_price_floor": 6,
    "id": "112_3",
    "wearid": "3",
    "sku": "112"
    },
    {
    "name": "Dual Berettas | Trigger Happy (Well-Worn)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-well-worn-600.png"
    },
    "suggested_price": 7,
    "suggested_price_floor": 5,
    "id": "112_4",
    "wearid": "4",
    "sku": "112"
    },
    {
    "name": "Dual Berettas | Trigger Happy (Battle-Scarred)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/dual-berettas-trigger-happy-battle-scarred-600.png"
    },
    "suggested_price": 3,
    "suggested_price_floor": 3,
    "id": "112_5",
    "wearid": "5",
    "sku": "112"
    },
    {
    "name": "R8 Revolver | Critical (Factory New)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-factory-new-600.png"
    },
    "suggested_price": 185,
    "suggested_price_floor": 185,
    "id": "113_1",
    "wearid": "1",
    "sku": "113"
    },
    {
    "name": "R8 Revolver | Critical (Minimal Wear)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-minimal-wear-600.png"
    },
    "suggested_price": 32,
    "suggested_price_floor": 31,
    "id": "113_2",
    "wearid": "2",
    "sku": "113"
    },
    {
    "name": "R8 Revolver | Critical (Field-Tested)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-field-tested-600.png"
    },
    "suggested_price": 17,
    "suggested_price_floor": 17,
    "id": "113_3",
    "wearid": "3",
    "sku": "113"
    },
    {
    "name": "R8 Revolver | Critical (Well-Worn)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-well-worn-600.png"
    },
    "suggested_price": 28,
    "suggested_price_floor": 28,
    "id": "113_4",
    "wearid": "4",
    "sku": "113"
    },
    {
    "name": "R8 Revolver | Critical (Battle-Scarred)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/r8-revolver-critical-battle-scarred-600.png"
    },
    "suggested_price": 24,
    "suggested_price_floor": 24,
    "id": "113_5",
    "wearid": "5",
    "sku": "113"
    },
    {
    "name": "AWP | Polycat (Factory New)",
    "category": "Mil-Spec Sniper Rifle",
    "rarity": "Mil-Spec",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-factory-new-600.png"
    },
    "suggested_price": 14,
    "suggested_price_floor": 13,
    "id": "114_1",
    "wearid": "1",
    "sku": "114"
    },
    {
    "name": "AWP | Polycat (Minimal Wear)",
    "category": "Mil-Spec Sniper Rifle",
    "rarity": "Mil-Spec",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-minimal-wear-600.png"
    },
    "suggested_price": 15,
    "suggested_price_floor": 8,
    "id": "114_2",
    "wearid": "2",
    "sku": "114"
    },
    {
    "name": "AWP | Polycat (Field-Tested)",
    "category": "Mil-Spec Sniper Rifle",
    "rarity": "Mil-Spec",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-field-tested-600.png"
    },
    "suggested_price": 12,
    "suggested_price_floor": 7,
    "id": "114_3",
    "wearid": "3",
    "sku": "114"
    },
    {
    "name": "AWP | Polycat (Well-Worn)",
    "category": "Mil-Spec Sniper Rifle",
    "rarity": "Mil-Spec",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-well-worn-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-well-worn-600.png"
    },
    "suggested_price": 6,
    "suggested_price_floor": 4,
    "id": "114_4",
    "wearid": "4",
    "sku": "114"
    },
    {
    "name": "AWP | Polycat (Battle-Scarred)",
    "category": "Mil-Spec Sniper Rifle",
    "rarity": "Mil-Spec",
    "type": "Sniper Rifle",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-battle-scarred-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/awp-polycat-battle-scarred-600.png"
    },
    "suggested_price": 4,
    "suggested_price_floor": 3,
    "id": "114_5",
    "wearid": "5",
    "sku": "114"
    },
    {
    "name": "Glock-18 | Toxificated (Factory New)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/glock-18-toxificated-factory-new-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/glock-18-toxificated-factory-new-600.png"
    },
    "suggested_price": 147,
    "suggested_price_floor": 110,
    "id": "115_1",
    "wearid": "1",
    "sku": "115"
    },
    {
    "name": "Glock-18 | Toxificated (Minimal Wear)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/glock-18-toxificated-minimal-wear-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/glock-18-toxificated-minimal-wear-600.png"
    },
    "suggested_price": 34,
    "suggested_price_floor": 32,
    "id": "115_2",
    "wearid": "2",
    "sku": "115"
    },
    {
    "name": "Glock-18 | Toxificated (Field-Tested)",
    "category": "Mil-Spec Pistol",
    "rarity": "Mil-Spec",
    "type": "Pistol",
    "paint_index": null,
    "color": "#4b69ff",
    "image": {
    "300px": "https://files.opskins.media/file/vgo-img/item/glock-18-toxificated-field-tested-300.png",
    "600px": "https://files.opskins.media/file/vgo-img/item/glock-18-toxificated-field-tested-600.png"
    },
    "suggested_price": 29,
    "suggested_price_floor": 28,
    "id": "115_3",
    "wearid": "3",
    "sku": "115"
    }
]

class Spinner extends Component {
  constructor(props) {
    super()

    this.state = {
      items: [],
      spinnerTransition: '',
      spinnerTransform: '',
      spinnerContent: []
    }
  }

  componentDidMount() {
    // setTimeout(this.spin.bind(this), 1000)
  }

  generateSpinnerContent(caseItems, times) {
    times = times || 1
    var limit = caseItems.length * times;
    var spinnerArray = [];
    while(spinnerArray.length < limit){
      spinnerArray = concat(spinnerArray, caseItems)
    }
    return shuffle(spinnerArray)
  }

  spin() {
    this.setState({
      spinnerTransition: '',
      spinnerTransform: `translateX(0px) translateZ(0px)`
    })

    var itemWidth = 120
    var winningItemIndex = random(150, 200);
    var offset = random(0, -60) + itemWidth * 3
    console.log('spinner offset', offset)

    var content = this.generateSpinnerContent(items, 10)
    const winner = clone(sample(items))
    winner.selected = true;
    content.splice(winningItemIndex, 1, winner)

    this.setState({spinnerContent: content})

    setTimeout(() => {
      this.setState({
        spinnerTransition: 'all 12s ease',
        spinnerTransform: `translateX(${winningItemIndex * -itemWidth + offset}px) translateZ(0px)`
      })
    }, 500)
  }

  render() {
    var { items } = this.props
    return (
      <div className="spinner">
        <div className="spinner-line" />
        <div className="spinner-content" style={{
          transition: this.state.spinnerTransition,
          transform: this.state.spinnerTransform
        }}>
          {
            this.state.spinnerContent.map(item => {
              return (
                item.selected ? 
                <div className="spinner-item selected">            
                  <img src={item.image['600px']} />
                </div> : 
                <div className="spinner-item">            
                  <img src={item.image['600px']} />
                </div>
              )
            })
          }
        </div>
        <Button onClick={this.spin.bind(this)} text="spin"/>
      </div>
    )
  }
}

export default Spinner

