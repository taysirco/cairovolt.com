// Auto-generated barrel index — DO NOT EDIT MANUALLY
// Each brand-category content is in its own file under src/data/category-content/{brand}/

export type { CategoryContent, FAQItem, BuyingGuideSection, QualityBadge, SoundcoreData, PowerBankData } from './category-content/_types';

import { anker_power_banks_content } from './category-content/anker/power-banks';
import { anker_wall_chargers_content } from './category-content/anker/wall-chargers';
import { anker_audio_content } from './category-content/anker/audio';
import { anker_cables_content } from './category-content/anker/cables';
import { anker_car_chargers_content } from './category-content/anker/car-chargers';
import { anker_speakers_content } from './category-content/anker/speakers';
import { joyroom_audio_content } from './category-content/joyroom/audio';
import { joyroom_power_banks_content } from './category-content/joyroom/power-banks';
import { joyroom_wall_chargers_content } from './category-content/joyroom/wall-chargers';
import { joyroom_cables_content } from './category-content/joyroom/cables';
import { joyroom_car_accessories_content } from './category-content/joyroom/car-accessories';
import { joyroom_car_holders_content } from './category-content/joyroom/car-holders';
import { joyroom_smart_watches_content } from './category-content/joyroom/smart-watches';

export const categoryContent: Record<string, Record<string, import("./category-content/_types").CategoryContent>> = {
    anker: {
        'power-banks': anker_power_banks_content,
        'wall-chargers': anker_wall_chargers_content,
        'audio': anker_audio_content,
        'cables': anker_cables_content,
        'car-chargers': anker_car_chargers_content,
        'speakers': anker_speakers_content,
    },
    joyroom: {
        'audio': joyroom_audio_content,
        'power-banks': joyroom_power_banks_content,
        'wall-chargers': joyroom_wall_chargers_content,
        'cables': joyroom_cables_content,
        'car-accessories': joyroom_car_accessories_content,
        'car-holders': joyroom_car_holders_content,
        'smart-watches': joyroom_smart_watches_content,
    },
};
