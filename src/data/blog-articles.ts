// Auto-generated barrel index — DO NOT EDIT MANUALLY
// Each article is in its own file under src/data/blog/

export type { BlogArticle } from './blog/_types';
import type { BlogArticle } from './blog/_types';

import { best_power_bank_egypt_2026 } from './blog/best-power-bank-egypt-2026';
import { anker_vs_joyroom_comparison } from './blog/anker-vs-joyroom-comparison';
import { best_iphone_17_charger_egypt } from './blog/best-iphone-17-charger-egypt';
import { how_to_identify_original_anker } from './blog/how-to-identify-original-anker';
import { best_bluetooth_earbuds_egypt_2026 } from './blog/best-bluetooth-earbuds-egypt-2026';
import { how_to_charge_power_bank_correctly } from './blog/how-to-charge-power-bank-correctly';
import { best_samsung_s26_charger } from './blog/best-samsung-s26-charger';
import { original_vs_fake_apple_charger_egypt } from './blog/original-vs-fake-apple-charger-egypt';
import { best_power_bank_router_power_outage_egypt } from './blog/best-power-bank-router-power-outage-egypt';
import { do_fake_chargers_damage_iphone_battery } from './blog/do-fake-chargers-damage-iphone-battery';
import { best_fast_chargers_for_samsung_s26_yahya_radwan } from './blog/best-fast-chargers-for-samsung-s26-yahya-radwan';
import { the_hidden_truth_about_gan_chargers_ahmed_medhat } from './blog/the-hidden-truth-about-gan-chargers-ahmed-medhat';
import { does_fast_charging_damage_battery_truth } from './blog/does-fast-charging-damage-battery-truth';
import { power_bank_airplane_rules_egypt_2026 } from './blog/power-bank-airplane-rules-egypt-2026';
import { best_car_charger_egypt_2026 } from './blog/best-car-charger-egypt-2026';
import { why_phone_charging_slowly_causes_solutions } from './blog/why-phone-charging-slowly-causes-solutions';
import { usb_c_cable_guide_egypt_2026 } from './blog/usb-c-cable-guide-egypt-2026';
import { protect_phone_from_heat_summer_egypt } from './blog/protect-phone-from-heat-summer-egypt';
import { power_bank_10000mah_real_capacity_myth } from './blog/power-bank-10000mah-real-capacity-myth';
import { how_to_spot_fake_chargers_7_tests } from './blog/how-to-spot-fake-chargers-7-tests';
import { gan_charger_technology_guide_egypt } from './blog/gan-charger-technology-guide-egypt';

export const blogArticles: import('./blog/_types').BlogArticle[] = [
    best_power_bank_egypt_2026,
    anker_vs_joyroom_comparison,
    best_iphone_17_charger_egypt,
    how_to_identify_original_anker,
    best_bluetooth_earbuds_egypt_2026,
    how_to_charge_power_bank_correctly,
    best_samsung_s26_charger,
    original_vs_fake_apple_charger_egypt,
    best_power_bank_router_power_outage_egypt,
    do_fake_chargers_damage_iphone_battery,
    best_fast_chargers_for_samsung_s26_yahya_radwan,
    the_hidden_truth_about_gan_chargers_ahmed_medhat,
    does_fast_charging_damage_battery_truth,
    power_bank_airplane_rules_egypt_2026,
    best_car_charger_egypt_2026,
    why_phone_charging_slowly_causes_solutions,
    usb_c_cable_guide_egypt_2026,
    protect_phone_from_heat_summer_egypt,
    power_bank_10000mah_real_capacity_myth,
    how_to_spot_fake_chargers_7_tests,
    gan_charger_technology_guide_egypt,
];



// Helper: get all article slugs for sitemap/static params
export function getAllBlogSlugs(): string[] {
    return blogArticles.map(a => a.slug);
}

// Helper: get article by slug
export function getBlogArticle(slug: string): BlogArticle | undefined {
    return blogArticles.find(a => a.slug === slug);
}

// Helper: get articles by category
export function getBlogArticlesByCategory(category: BlogArticle['category']): BlogArticle[] {
    return blogArticles.filter(a => a.category === category);
}
