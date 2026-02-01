-- ============================================
-- SEED DATA FOR HAWKINS READINESS NETWORK
-- ============================================

-- ============================================
-- 1. SAMPLE AREAS
-- ============================================
INSERT INTO public.areas (id, name, risk_level, latitude, longitude, disaster_types, is_coastal, is_near_river, is_seismic_zone, current_status) VALUES
('a1111111-1111-1111-1111-111111111111', 'Downtown District', 'high', 13.3409, 74.7421, ARRAY['earthquake', 'flood', 'cyclone'], true, false, true, 'safe'),
('a2222222-2222-2222-2222-222222222222', 'Riverside Colony', 'high', 13.3500, 74.7500, ARRAY['flood', 'cyclone'], false, true, false, 'safe'),
('a3333333-3333-3333-3333-333333333333', 'Highland Park', 'low', 13.3300, 74.7300, ARRAY['earthquake'], false, false, true, 'safe'),
('a4444444-4444-4444-4444-444444444444', 'Coastal Beach Area', 'high', 13.3600, 74.7800, ARRAY['cyclone', 'flood'], true, false, false, 'safe'),
('a5555555-5555-5555-5555-555555555555', 'Industrial Zone', 'medium', 13.3250, 74.7250, ARRAY['earthquake', 'flood'], false, true, true, 'safe');

-- ============================================
-- 2. SAMPLE SHELTERS
-- ============================================
INSERT INTO public.shelters (name, area_id, latitude, longitude, capacity, current_occupancy, status, disaster_types, amenities, contact_phone, is_elevated, is_wind_safe) VALUES
-- Downtown shelters
('Downtown Community Center', 'a1111111-1111-1111-1111-111111111111', 13.3415, 74.7425, 500, 0, 'open', ARRAY['earthquake', 'flood', 'cyclone'], ARRAY['water', 'medical', 'food', 'power'], '+91-9876543210', true, true),
('Block C Emergency Shelter', 'a1111111-1111-1111-1111-111111111111', 13.3420, 74.7430, 300, 0, 'open', ARRAY['earthquake', 'cyclone'], ARRAY['water', 'medical', 'food'], '+91-9876543211', false, true),

-- Riverside shelters
('Riverside Relief Center', 'a2222222-2222-2222-2222-222222222222', 13.3510, 74.7510, 400, 0, 'open', ARRAY['flood', 'cyclone'], ARRAY['water', 'medical', 'food', 'power'], '+91-9876543212', true, true),
('River Valley School', 'a2222222-2222-2222-2222-222222222222', 13.3505, 74.7505, 350, 0, 'open', ARRAY['flood'], ARRAY['water', 'food'], '+91-9876543213', true, false),

-- Highland Park shelters
('Highland Safety Hub', 'a3333333-3333-3333-3333-333333333333', 13.3310, 74.7310, 250, 0, 'open', ARRAY['earthquake'], ARRAY['water', 'medical', 'food'], '+91-9876543214', false, true),

-- Coastal shelters
('Coastal Guard Station', 'a4444444-4444-4444-4444-444444444444', 13.3610, 74.7810, 600, 0, 'open', ARRAY['cyclone', 'flood'], ARRAY['water', 'medical', 'food', 'power', 'communication'], '+91-9876543215', true, true),
('Beach Road Community Hall', 'a4444444-4444-4444-4444-444444444444', 13.3605, 74.7805, 400, 0, 'open', ARRAY['cyclone'], ARRAY['water', 'medical', 'food'], '+91-9876543216', false, true),

-- Industrial Zone shelters
('Industrial Safety Center', 'a5555555-5555-5555-5555-555555555555', 13.3260, 74.7260, 350, 0, 'open', ARRAY['earthquake', 'flood'], ARRAY['water', 'medical', 'food'], '+91-9876543217', true, false);

-- ============================================
-- 3. DRILL QUESTIONS - EARTHQUAKE
-- ============================================
INSERT INTO public.drill_questions (drill_type, question_text, question_type, options, correct_answer, explanation, order_num) VALUES
('earthquake', 'Do you know your nearest earthquake shelter?', 'yes_no', '["Yes", "No"]', 'Yes', 'Knowing your nearest shelter can save precious minutes during an emergency.', 1),
('earthquake', 'What is the first action you should take during an earthquake?', 'multiple_choice', '["Run outside immediately", "Drop, Cover, and Hold On", "Call emergency services", "Open windows"]', 'Drop, Cover, and Hold On', 'DROP to your hands and knees, take COVER under a sturdy table, and HOLD ON until shaking stops.', 2),
('earthquake', 'Should you use elevators during an earthquake?', 'yes_no', '["Yes", "No"]', 'No', 'Elevators can malfunction during earthquakes. Always use stairs.', 3),
('earthquake', 'Who is your emergency contact person?', 'knowledge_check', NULL, NULL, 'Having an emergency contact is crucial for coordination during disasters.', 4),
('earthquake', 'What should you do immediately after an earthquake stops?', 'multiple_choice', '["Stay where you are and wait", "Check for injuries and hazards", "Take photos", "Go back to sleep"]', 'Check for injuries and hazards', 'After shaking stops, check yourself and others for injuries, look for hazards like gas leaks or structural damage.', 5);

-- ============================================
-- 4. DRILL QUESTIONS - FLOOD
-- ============================================
INSERT INTO public.drill_questions (drill_type, question_text, question_type, options, correct_answer, explanation, order_num) VALUES
('flood', 'Do you know the nearest flood shelter on higher ground?', 'yes_no', '["Yes", "No"]', 'Yes', 'Flood shelters are located on elevated areas to ensure safety from rising water.', 1),
('flood', 'What should you do if flood water is approaching your home?', 'multiple_choice', '["Wait and see how high it gets", "Switch off electricity and move to higher floor", "Start bailing water", "Stay in basement"]', 'Switch off electricity and move to higher floor', 'Turn off electricity to prevent electrocution and move to the highest floor of your building.', 2),
('flood', 'Is it safe to walk through moving flood water?', 'yes_no', '["Yes", "No"]', 'No', 'Just 6 inches of moving water can knock you down. Avoid walking through flood water.', 3),
('flood', 'What should you do about drinking water during floods?', 'multiple_choice', '["Drink tap water as usual", "Only drink bottled or boiled water", "Drink flood water if filtered", "No need to worry about water"]', 'Only drink bottled or boiled water', 'Flood water can contaminate water supply. Only drink bottled or boiled water.', 4),
('flood', 'Who is your emergency contact for flood situations?', 'knowledge_check', NULL, NULL, 'Having a contact outside the flood zone can help coordinate rescue efforts.', 5);

-- ============================================
-- 5. DRILL QUESTIONS - CYCLONE
-- ============================================
INSERT INTO public.drill_questions (drill_type, question_text, question_type, options, correct_answer, explanation, order_num) VALUES
('cyclone', 'Do you know your nearest cyclone shelter?', 'yes_no', '["Yes", "No"]', 'Yes', 'Cyclone shelters are built to withstand high winds and protect you during storms.', 1),
('cyclone', 'Where is the safest place to be during a cyclone?', 'multiple_choice', '["Near windows to watch the storm", "In a wind-safe interior room", "Outside in open area", "In a car"]', 'In a wind-safe interior room', 'Stay in an interior room away from windows. Bathrooms and closets are often safest.', 2),
('cyclone', 'Should you tape windows during a cyclone?', 'yes_no', '["Yes", "No"]', 'No', 'Tape does not prevent windows from breaking. Stay away from windows instead.', 3),
('cyclone', 'What should be in your emergency kit?', 'multiple_choice', '["Only food", "Water, food, flashlight, first aid, radio, batteries", "Just a phone", "Nothing needed"]', 'Water, food, flashlight, first aid, radio, batteries', 'A proper emergency kit includes water, non-perishable food, flashlight, first aid supplies, battery-powered radio, and extra batteries.', 4),
('cyclone', 'Who should you contact after a cyclone passes?', 'knowledge_check', NULL, NULL, 'Let your emergency contacts know you are safe once the cyclone has passed.', 5);

-- ============================================
-- 6. DISASTER PROTOCOLS - EARTHQUAKE
-- ============================================
INSERT INTO public.disaster_protocols (disaster_type, protocol_type, title, content, order_num, icon_name) VALUES
('earthquake', 'immediate_action', 'Drop, Cover, and Hold On', 'Immediately drop to your hands and knees. Take cover under a sturdy desk or table. Hold on to it and be prepared to move with it. Stay away from windows, mirrors, and heavy objects that could fall.', 1, 'shield'),
('earthquake', 'immediate_action', 'Stay Indoors', 'Do NOT run outside during shaking. Most injuries occur when people try to move to a different location or exit the building. Stay where you are until shaking stops.', 2, 'home'),
('earthquake', 'immediate_action', 'Avoid Elevators', 'Never use elevators during or immediately after an earthquake. They may malfunction or become stuck. Always use stairs.', 3, 'stairs'),
('earthquake', 'first_aid', 'Treat Bleeding', 'Apply direct pressure to wounds with clean cloth. Elevate the injured area if possible. Seek medical help for severe bleeding.', 1, 'bandage'),
('earthquake', 'first_aid', 'Immobilize Fractures', 'Do not try to realign broken bones. Immobilize the injured area with splints made from stiff material. Seek immediate medical attention.', 2, 'bone'),
('earthquake', 'safety_tips', 'Check for Hazards', 'After shaking stops, check for gas leaks (smell), damaged electrical wiring, and structural damage. Exit building if it appears unsafe.', 1, 'warning'),
('earthquake', 'evacuation', 'Know Your Shelter', 'Familiarize yourself with the route to your designated earthquake shelter. Keep a map and emergency supplies ready.', 1, 'map');

-- ============================================
-- 7. DISASTER PROTOCOLS - FLOOD
-- ============================================
INSERT INTO public.disaster_protocols (disaster_type, protocol_type, title, content, order_num, icon_name) VALUES
('flood', 'immediate_action', 'Move to Higher Ground', 'If flooding is imminent, move immediately to higher ground or the upper floors of your building. Do not wait for official evacuation orders if you feel threatened.', 1, 'arrow-up'),
('flood', 'immediate_action', 'Turn Off Utilities', 'Switch off electricity, gas, and water mains to prevent electrical shocks and explosions. Only do this if it is safe to reach the switches.', 2, 'power'),
('flood', 'immediate_action', 'Avoid Flood Water', 'Never walk, swim, or drive through flood water. Just 6 inches of moving water can knock you down, and 12 inches can carry away a car.', 3, 'droplet'),
('flood', 'first_aid', 'Prevent Waterborne Diseases', 'Avoid contact with flood water when possible as it may contain sewage and chemicals. Wash hands thoroughly. Treat any cuts or wounds immediately.', 1, 'shield'),
('flood', 'safety_tips', 'Water Safety', 'Only drink bottled, boiled, or treated water. Flood water can contaminate water supplies. Do not eat food that has come in contact with flood water.', 1, 'water'),
('flood', 'safety_tips', 'Stay Informed', 'Monitor weather reports and official announcements. Flood conditions can change rapidly. Be ready to evacuate at short notice.', 2, 'radio'),
('flood', 'evacuation', 'Evacuation Route', 'Know multiple routes to your designated flood shelter on higher ground. Keep emergency supplies and important documents in waterproof containers.', 1, 'route');

-- ============================================
-- 8. DISASTER PROTOCOLS - CYCLONE
-- ============================================
INSERT INTO public.disaster_protocols (disaster_type, protocol_type, title, content, order_num, icon_name) VALUES
('cyclone', 'immediate_action', 'Secure Indoors', 'Stay inside a wind-safe interior room. Close all interior doors. Secure exterior doors. Move away from windows, skylights, and glass doors.', 1, 'door-closed'),
('cyclone', 'immediate_action', 'Safe Room Selection', 'Choose a small, windowless interior room on the lowest floor that is not prone to flooding. Bathrooms, closets, and hallways are often safest.', 2, 'home'),
('cyclone', 'immediate_action', 'Protect from Debris', 'Take cover under a sturdy table or workbench. Use mattresses, blankets, or sleeping bags for additional protection from flying debris.', 3, 'shield'),
('cyclone', 'first_aid', 'Treat Wind-Related Injuries', 'Flying debris can cause cuts and puncture wounds. Clean wounds thoroughly, apply pressure to stop bleeding, and bandage securely.', 1, 'bandage'),
('cyclone', 'safety_tips', 'Emergency Kit Ready', 'Keep your emergency kit accessible with water (1 gallon per person per day), non-perishable food, flashlight, first aid kit, battery-powered radio, extra batteries, and important documents.', 1, 'backpack'),
('cyclone', 'safety_tips', 'Communication Plan', 'Establish a family communication plan. Designate an out-of-area contact. Keep mobile phones charged. Have a battery-powered radio for updates.', 2, 'phone'),
('cyclone', 'safety_tips', 'Eye of the Storm', 'Do not go outside during the eye of the cyclone. The calm is temporary - violent winds will return from the opposite direction.', 3, 'warning'),
('cyclone', 'evacuation', 'Know Your Cyclone Shelter', 'Identify the nearest official cyclone shelter. These are specially built to withstand extreme winds. Know the route and keep transport ready.', 1, 'building');

-- ============================================
-- 9. SAMPLE DANGER ZONES
-- ============================================
INSERT INTO public.danger_zones (area_id, zone_type, coordinates, disaster_type, description, is_active) VALUES
-- Red zone in Downtown (high risk coastal area)
('a1111111-1111-1111-1111-111111111111', 'red', '[
    {"lat": 13.3405, "lng": 74.7415},
    {"lat": 13.3405, "lng": 74.7435},
    {"lat": 13.3425, "lng": 74.7435},
    {"lat": 13.3425, "lng": 74.7415}
]', 'cyclone', 'High-risk coastal area prone to cyclone damage', true),

-- Red zone in Riverside (flood-prone)
('a2222222-2222-2222-2222-222222222222', 'red', '[
    {"lat": 13.3495, "lng": 74.7495},
    {"lat": 13.3495, "lng": 74.7515},
    {"lat": 13.3515, "lng": 74.7515},
    {"lat": 13.3515, "lng": 74.7495}
]', 'flood', 'Low-lying area near river, high flood risk', true),

-- Yellow zone in Industrial (moderate earthquake risk)
('a5555555-5555-5555-5555-555555555555', 'yellow', '[
    {"lat": 13.3245, "lng": 74.7245},
    {"lat": 13.3245, "lng": 74.7265},
    {"lat": 13.3265, "lng": 74.7265},
    {"lat": 13.3265, "lng": 74.7245}
]', 'earthquake', 'Moderate seismic activity zone', true),

-- Green zone in Highland Park (safe zone)
('a3333333-3333-3333-3333-333333333333', 'green', '[
    {"lat": 13.3295, "lng": 74.7295},
    {"lat": 13.3295, "lng": 74.7315},
    {"lat": 13.3315, "lng": 74.7315},
    {"lat": 13.3315, "lng": 74.7295}
]', NULL, 'Elevated safe zone, lower disaster risk', true);