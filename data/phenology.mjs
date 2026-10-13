/**
 * Seasonal cues for the field card. These are common neighborhood markers,
 * not a species guide. Mushrooms are for looking, never for eating.
 */
const m = (look, listen, touch, sow, harvest, skip, task, walk, sit) => ({
  look, listen, touch, sow, harvest, skip, task, walk, sit
});

export const phenology = {
  continental: {
    1: m(
      ["tracks in fresh snow, one line at a time", "snow held in hemlock, bare ground under the boughs"],
      ["chickadees working a flock", "blue jays farther off"],
      ["sunlit stone against bare fingers"],
      [],
      ["kale, only if a plant is still standing"],
      ["tomatoes", "basil", "digging frozen soil"],
      "Walk the beds and see what the cold took. Leave stems that still hold seed.",
      "Stay on the sunny side of the street. A short loop is enough.",
      "Put your back against a wall out of the wind and watch one tree."
    ),
    2: m(
      ["red-osier dogwood stems against snow", "hazel catkins swelling on a warm south edge"],
      ["cardinals tuning up on mild mornings", "chickadees"],
      ["mud at the south edge of a bed, if a thaw has started"],
      [],
      [],
      ["tomatoes outside", "walking on thawing lawns"],
      "On a dry day above freezing, look at fruit trees and note what winter broke. Leave the soil alone.",
      "Take the block that gets sun and turn around before you get cold.",
      "Face the low sun for ten quiet minutes."
    ),
    3: m(
      ["skunk cabbage in wet woods, if you already know a public path", "red maple flowers, small and red, before the leaves"],
      ["red-winged blackbirds", "spring peepers on a warm night"],
      ["a handful of soil: if it smears, do not dig"],
      ["peas, if the soil crumbles", "spinach", "radishes"],
      [],
      ["tomatoes outside", "basil", "digging wet soil"],
      "Start tomatoes indoors if you grow them. Outside, only cold-hardy seed, and only in soil that crumbles.",
      "Walk toward water you can hear, then come back.",
      "Stop where you can hear peepers or wind, and stay put."
    ),
    4: m(
      ["bloodroot or trout lily on a known trail", "shadbush in white along the edge of woods"],
      ["spring peepers", "a phoebe near a bridge or porch"],
      ["earth that finally holds together instead of smearing"],
      ["peas", "lettuce", "kale", "radishes", "carrots"],
      ["asparagus, if a bed is already up"],
      ["tomatoes outside before the last frost", "basil"],
      "Sow the cold crops. Keep tomatoes inside until the frost date has passed.",
      "Take a loop with one tree that is flowering and one that is still bare.",
      "Sit where you can watch one flowering shrub."
    ),
    5: m(
      ["apple bloom or lilac, whichever the street has", "warblers in fresh leaves"],
      ["the dawn chorus, earlier than you want", "an ovenbird if you are near woods"],
      ["soil that is finally warm at the wrist"],
      ["beans", "tomatoes", "basil", "squash", "after the last frost has passed"],
      ["asparagus", "rhubarb", "lettuce before it bolts"],
      ["planting tender crops the week of a late frost"],
      "If the last frost has passed, set out the tender plants and mulch them.",
      "Walk the street with the most bloom, then a block with none, and notice the difference.",
      "Sit under something in flower and listen longer than you look."
    ),
    6: m(
      ["milkweed coming into flower", "fireflies at the edge of a lawn, later"],
      ["wood thrush or catbird", "fewer geese, more insects"],
      ["mulch, to see if the soil under it is still damp"],
      ["a short row of beans", "basil"],
      ["lettuce", "strawberries", "peas"],
      ["letting bare soil bake"],
      "Mulch, harvest what is bolting, and water in the morning.",
      "Go near dusk if you want fireflies. Otherwise take shade.",
      "Sit at the edge of mowed grass and taller weeds and watch the boundary."
    ),
    7: m(
      ["black-eyed Susan", "thunderheads building in the afternoon"],
      ["cicadas", "a catbird in the shrub layer"],
      ["soil under mulch, still cool if the mulch is doing its job"],
      ["fall carrots or beets, if you still have six weeks of mild weather"],
      ["beans", "zucchini", "blueberries"],
      ["a new patch of lettuce in the open sun"],
      "Harvest, then water early. Save midday for shade, not for digging.",
      "Walk early. The afternoon is for being still.",
      "Take a shady seat and watch one cloud all the way across."
    ),
    8: m(
      ["goldenrod starting", "Joe-Pye weed in wetter ground"],
      ["crickets in earnest", "goldfinches"],
      ["cool morning air on your wrists"],
      ["spinach", "kale", "lettuce for fall"],
      ["tomatoes", "beans", "sweet corn if you grew it"],
      ["ignoring the first tired tomato vines"],
      "Sow a fall green this week and keep picking the summer crops that are still giving.",
      "Take the shadier loop. Pause where the goldenrod has started.",
      "Sit in the evening and count cricket sound instead of looking at a screen."
    ),
    9: m(
      ["first red on maple and sumac", "asters in the rough grass"],
      ["crickets slowing", "geese, and hawks if the sky is clear"],
      ["dew on a sleeve"],
      ["spinach", "garlic at the end of the month in colder towns"],
      ["winter squash", "apples", "tomatoes"],
      ["a big new planting of basil"],
      "Pull what has quit. Keep the greens. Garlic can wait until the soil cools.",
      "Walk toward the most color, even if that is one tree on a block.",
      "Face the low sun and listen for birds that were not here in July."
    ),
    10: m(
      ["maples turning at the edges before the oaks", "woolly bear caterpillars crossing a path", "acorns and the first leaves that actually crunch"],
      ["white-throated sparrows, new this month", "geese high overhead"],
      ["a leaf that cracks instead of smearing", "soil in the bed: crumble means you can plant, smear means wait"],
      ["garlic cloves, point up, in soil that crumbles", "spinach under a light cover", "oats or clover as a cover crop"],
      ["kale", "leeks", "parsley that is still green"],
      ["tomatoes", "basil", "beans", "squash"],
      "Pull blackened vines. Leave perennial stems for insects. Garlic goes in if the soil still crumbles.",
      "Take the street with the most trees, then come back a different block.",
      "Face the low sun and listen for birds that were not here in August."
    ),
    11: m(
      ["oaks holding brown leaves after the maples are bare", "larch gold, if you have them"],
      ["juncos", "a great horned owl at dusk, if the neighborhood is quiet"],
      ["frost on the grass, melted by midmorning"],
      ["garlic, only if the ground is still open"],
      ["Brussels sprouts", "kale until a hard freeze"],
      ["tomatoes", "digging after a hard freeze"],
      "Mulch the garlic. Drain a hose if you still have one out. Leave seed heads standing.",
      "A gray day is a good day. Walk until your hands want pockets, then turn around.",
      "Sit where you can see a bare tree against the sky."
    ),
    12: m(
      ["low sun and long blue shadow", "evergreen against the brown oaks"],
      ["a quiet woods, then chickadees", "almost no insects"],
      ["frozen ground, which means you are walking, not digging"],
      [],
      [],
      ["planting", "pruning on a bitter day"],
      "Rest the beds. Walk, and note one thing you want to change in spring.",
      "Take a short loop in the brightest hour and then go in.",
      "Watch one feeder or one bare tree. Either is enough."
    )
  },
  subtropical: {
    1: m(
      ["camellias in flower", "collards standing through a cold snap"],
      ["white-throated sparrows", "a Carolina wren"],
      ["soil that is cool but workable"],
      ["peas", "lettuce", "spinach", "onions"],
      ["citrus", "kale", "collards"],
      ["tomatoes outside during a freeze warning", "basil"],
      "This is a growing month. Sow greens and protect them if a hard freeze is forecast.",
      "Take a sunny block. Winter light is the point.",
      "Sit in the sun, out of the wind, and watch one shrub."
    ),
    2: m(
      ["daffodils", "redbud swelling or opening, depending on the week"],
      ["frogs on a warm night", "cardinals"],
      ["soil drying at the surface"],
      ["potatoes", "peas", "lettuce", "carrots"],
      ["citrus", "leafy greens"],
      ["a late freeze catching new basil"],
      "Keep sowing cool crops. Have a sheet ready for one cold night.",
      "Walk toward whatever is blooming. It will not be everywhere yet.",
      "Sit near the first shrub that has color."
    ),
    3: m(
      ["dogwood and azalea starting", "redbud in flower"],
      ["migrant songbirds in the morning", "frogs"],
      ["warm soil on a south bed"],
      ["the last big sowing of lettuce", "potatoes"],
      ["greens before they bolt"],
      ["waiting too long to set out tomatoes in the warmer towns"],
      "Finish the cool crops. In warmer parts of this climate, tomatoes can go out late in the month if frost is done.",
      "Take a neighborhood loop that passes one flowering tree.",
      "Sit and listen for birds that are passing through, not staying."
    ),
    4: m(
      ["azaleas", "dogwood in full flower on many streets"],
      ["hummingbirds back", "a chuck-will's-widow at dusk in wilder edges"],
      ["soil warm enough for beans"],
      ["tomatoes", "beans", "squash", "basil", "corn"],
      ["lettuce", "strawberries"],
      ["another round of peas"],
      "Set out the summer crops and mulch them before the heat arrives.",
      "Walk in the morning. Afternoon is already strong.",
      "Sit near flowers and watch what visits them."
    ),
    5: m(
      ["blackberries flowering or fruiting", "the canopy closing"],
      ["a thick dawn chorus", "cicadas starting in the south"],
      ["mulch, and the heat under it"],
      ["okra", "sweet potatoes", "another row of beans"],
      ["strawberries", "the last comfortable lettuce"],
      ["lettuce in full sun", "peas"],
      "Mulch deeply. Shift watering to morning. Plant the crops that like heat.",
      "Go early. Choose the shady side of the street on the way back.",
      "Sit at dawn, before the humidity stacks up."
    ),
    6: m(
      ["crape myrtle starting", "deep shade under hardwoods"],
      ["cicadas or katydids", "a mockingbird running through a list"],
      ["soil that dries fast at the surface and stays damp below if mulched"],
      ["okra", "southern peas", "sweet potatoes"],
      ["tomatoes", "squash", "blueberries"],
      ["lettuce", "midday digging"],
      "Harvest early, water early, and stay out of the middle of the day.",
      "A short dawn loop beats a long afternoon one.",
      "Shade, a seat, and one bird. Then go in."
    ),
    7: m(
      ["storm light in the afternoon", "crape myrtle in flower"],
      ["cicadas", "thunder, then frogs"],
      ["rain-cooled air, briefly"],
      ["another sowing of okra if you still want it"],
      ["tomatoes", "peppers", "okra"],
      ["lettuce", "planting a new lawn bed"],
      "Keep picking. After a storm, look for broken stems and leave the rest.",
      "Walk only if the lightning is gone. Otherwise wait for morning.",
      "Sit on a porch and let the storm be the outing."
    ),
    8: m(
      ["the first tired look on tomato vines", "goldenrod in rougher fields"],
      ["katydids at night", "hummingbirds still working flowers"],
      ["mornings that are finally a little easier"],
      ["fall tomatoes in the hotter parts", "greens only in shade, late in the month"],
      ["peppers", "okra", "watermelon"],
      ["a big lettuce bed in the open"],
      "Start the fall garden in the shade of taller plants. Keep harvesting the summer beds.",
      "Go early and take water even for a short loop.",
      "Sit still at sunrise. The day will ask less of you then."
    ),
    9: m(
      ["goldenrod and asters", "persimmons sizing up"],
      ["katydids", "blue jays caching"],
      ["soil that has finally cooled in the morning"],
      ["lettuce", "kale", "cilantro", "onions"],
      ["peppers", "sweet potatoes late in the month"],
      ["a new round of squash"],
      "Pull summer crops that have quit. Sow the winter greens.",
      "Choose a street with asters or a single persimmon tree.",
      "Sit where you can watch jays work."
    ),
    10: m(
      ["persimmons coloring", "asters still going", "sweetgum starting to blotch"],
      ["katydids on warm nights", "blue jays"],
      ["soil cool enough for greens"],
      ["garlic", "lettuce", "spinach", "kale", "cilantro", "onions"],
      ["peppers", "sweet potatoes", "the last okra"],
      ["a new round of squash", "basil as a long-term plan"],
      "Pull summer crops that have quit. Sow the winter greens this week.",
      "Take shade in the middle of the day and sun at the start.",
      "Find a pecan or an oak and watch what lands in it."
    ),
    11: m(
      ["camellias opening", "sweetgum and maple color, patchy"],
      ["white-throated sparrows arriving", "fewer insects"],
      ["a real chill in the morning, gone by noon"],
      ["garlic", "lettuce", "strawberries", "onions"],
      ["greens", "persimmons when soft"],
      ["tomatoes", "basil left uncovered on a freeze night"],
      "This is prime sowing weather. Cover tender leftovers if a frost night shows up.",
      "Walk in the afternoon light. It is the kindest hour.",
      "Sit in a spot of sun and stay until it moves off you."
    ),
    12: m(
      ["citrus coloring", "pansies and collards in neighborhood beds"],
      ["a Carolina wren", "juncos"],
      ["cold soil in the morning, workable by noon"],
      ["lettuce", "spinach", "onions", "peas"],
      ["citrus", "collards", "kale"],
      ["tomatoes", "leaving a hose charged before a freeze"],
      "Keep the greens going. Harvest collards after a cold snap if you like them sweeter.",
      "A sunny hour outside is the whole assignment.",
      "Sit against a south wall."
    )
  },
  desert: {
    1: m(
      ["citrus in fruit", "winter annuals if the rains came"],
      ["white-crowned sparrows", "doves at the edges of the day"],
      ["cool soil you can work at noon"],
      ["lettuce", "peas", "brassicas", "onions", "herbs"],
      ["citrus", "leafy greens", "peas"],
      ["planting into a forecast hard freeze without cover"],
      "This is the heart of the desert growing season. Sow and harvest the cool crops.",
      "Midday is friendly. Take a longer loop if you want one.",
      "Sit in the sun. Shade can wait for May."
    ),
    2: m(
      ["citrus blossom starting", "wildflowers in a good year, on roadsides"],
      ["house finches", "doves"],
      ["soil warming on the south side of a bed"],
      ["tomatoes late in the month", "peppers", "more lettuce"],
      ["citrus", "broccoli", "peas"],
      ["forgetting one last frost night"],
      "In the low desert, tomatoes can go out late this month. Keep a cover for one cold night.",
      "Walk early or at dusk if a warm spell hits. Otherwise the day is open.",
      "Sit near citrus if it is blooming and just smell it."
    ),
    3: m(
      ["palo verde starting to yellow the streets", "owl's clover or lupine if the winter was wet"],
      ["curve-billed thrasher", "white-winged doves returning"],
      ["warmth coming off a wall in the evening"],
      ["tomatoes", "peppers", "basil", "squash"],
      ["the last lettuce", "citrus", "peas"],
      ["a new bed of spinach"],
      "Get the warm crops planted. Let the lettuce finish.",
      "Go while the light is long and the heat is still polite.",
      "Sit at dusk and watch one tree fill with birds."
    ),
    4: m(
      ["palo verde in full flower", "mesquite leafing"],
      ["white-winged doves", "mockingbirds before dawn"],
      ["soil that is already hot at the surface by noon"],
      ["melons", "okra", "cowpeas"],
      ["the last cool-season greens"],
      ["lettuce", "peas", "midday work"],
      "Mulch thick. Water deep. Stop planting lettuce.",
      "Morning only. Carry water even for a short loop.",
      "Be outside at sunrise. Be indoors at noon."
    ),
    5: m(
      ["saguaro flowers on the tips of arms, in the Sonoran desert", "palo verde seed pods forming"],
      ["doves early", "almost nothing at noon"],
      ["a wall so hot you do not need to touch it twice"],
      [],
      ["early melons if you planted in March", "herbs in shade"],
      ["lettuce", "peas", "any new leafy bed", "hiking at midday"],
      "Water deep in the morning. Do not start new beds. Survival is the garden task.",
      "If you go out, go before the sun clears the roofs. Stay on a path.",
      "A seat in deep shade at dawn is the outing."
    ),
    6: m(
      ["desert in its bleached summer color", "mesquite pods"],
      ["cicadas", "doves before sunrise"],
      ["air that is warm before breakfast"],
      [],
      ["melons", "basil if it has shade"],
      ["planting", "midday walks"],
      "Water, mulch, and leave the soil alone during the day.",
      "A ten-minute dawn loop counts. Turn around when you notice the heat.",
      "Sit outside only while the sky is still pink."
    ),
    7: m(
      ["storm stalks on the horizon", "creosote, sharp after rain"],
      ["thunder far off", "spadefoot toads after a real storm, near washes"],
      ["the first cool minute after rain"],
      [],
      ["chiles", "basil"],
      ["walking a wash while rain is still upstream", "planting lettuce"],
      "If the monsoon arrives, stay out of washes. Smell the creosote and go back in.",
      "Wait out the lightning. Then a short walk on pavement, not in a wash.",
      "Watch one storm from a covered seat."
    ),
    8: m(
      ["monsoon clouds most afternoons", "devil's claw pods along sandy edges"],
      ["cicadas", "toads after rain"],
      ["humidity you did not feel in June"],
      [],
      ["chiles", "Armenian cucumber if you planted it"],
      ["lettuce", "standing under a lone tree in lightning"],
      "Prepare beds for fall, but wait to sow tomatoes until the nights ease.",
      "Dawn, pavement, water, and no washes.",
      "Sit under cover and watch the build of an afternoon cloud."
    ),
    9: m(
      ["the light getting lower", "chiles reddening"],
      ["less cicada noise late in the month", "doves"],
      ["mornings you can stand in"],
      ["the first greens in shade, late in the month"],
      ["chiles", "basil"],
      ["a full tomato planting in the first week, if nights are still hot"],
      "Get the beds ready. Sow when the nights actually cool, not when you are impatient.",
      "You can walk a little later than in July. Still carry water.",
      "Sit outside after sunset. The heat lets go slowly."
    ),
    10: m(
      ["palo verde still holding a yellow cast", "long shadows by midafternoon", "prickly pear pads, left alone"],
      ["Gambel's quail near wash vegetation", "doves at the edges of the day"],
      ["soil that is finally cool enough to work in the morning"],
      ["tomatoes", "peppers", "lettuce", "peas", "garlic", "brassicas"],
      ["basil if it survived summer", "figs if a tree is nearby and it is yours"],
      ["waiting for spring to plant tomatoes"],
      "This is the start of the desert growing season. Plant into cool soil, water deep, and shade new seedlings for a few days.",
      "Go in the morning or late afternoon. Stay on a path and watch the ground.",
      "Sit in shade and let your eyes adjust to the distance."
    ),
    11: m(
      ["clear light and long views", "citrus coloring"],
      ["white-crowned sparrows back", "a quiet afternoon"],
      ["soil you can work at lunchtime"],
      ["more greens", "garlic", "onions", "herbs", "another tomato if the first is in"],
      ["tomatoes just setting", "herbs"],
      ["shutting the garden down for winter"],
      "Keep planting. November is one of the best garden months in the low desert.",
      "The day is open. Take the loop you skipped in July.",
      "Sit in the sun and watch the distance."
    ),
    12: m(
      ["citrus ripe or nearly", "winter greens thick in a tended bed"],
      ["sparrows", "ravens"],
      ["a chill at dawn that is gone by ten"],
      ["lettuce", "peas", "brassicas", "onions"],
      ["citrus", "broccoli", "herbs"],
      ["forgetting a frost cloth on the one cold night"],
      "Harvest and sow. Cover tomatoes if a hard frost is actually forecast.",
      "Midday sun is a gift this month. Use it.",
      "Sit outside at noon on purpose."
    )
  },
  mediterranean: {
    1: m(
      ["citrus in yards", "bare deciduous trees against green oaks"],
      ["white-crowned sparrows", "a towhee scratching"],
      ["damp soil if the rains have started"],
      ["lettuce", "peas", "fava beans", "onions"],
      ["citrus", "greens", "broccoli"],
      ["tomatoes", "letting new seed dry out"],
      "Keep the cool-season beds going. This is growing weather.",
      "A hill loop if the trail is public and dry enough. Otherwise the sidewalk.",
      "Sit where you can see both a bare tree and an evergreen."
    ),
    2: m(
      ["ceanothus blooming on wilder edges", "almond blossom in orchard country"],
      ["hummingbirds", "frogs after rain"],
      ["soil that is wet but not sour"],
      ["more greens", "peas", "potatoes"],
      ["citrus", "broccoli", "peas"],
      ["tomatoes before the frost risk is gone in colder valleys"],
      "Sow another round of cool crops. In colder valleys, wait on tomatoes.",
      "Walk after rain, on paths, not on saturated hillsides.",
      "Sit near something in bloom and listen for hummingbirds."
    ),
    3: m(
      ["wildflowers on open slopes in a decent rain year", "fruit trees in bloom"],
      ["migrant warblers", "frogs"],
      ["soil drying between rains"],
      ["the last lettuce", "potatoes"],
      ["greens before the heat", "citrus"],
      ["heavy watering of lawns", "planting into a slope that is still saturated"],
      "Finish cool crops. Get summer beds ready, but do not rush the heat-lovers in cold valleys.",
      "Take a public hillside path if it is firm. Turn around if it is greasy.",
      "Sit in the sun. The rainy season is loosening."
    ),
    4: m(
      ["California poppies on banks", "oaks looking unchanged, which is the point"],
      ["house finches", "swallows"],
      ["warmth in the top inch of soil"],
      ["tomatoes", "beans", "squash", "basil"],
      ["the last easy greens"],
      ["a new pea bed"],
      "Plant the summer crops and mulch. The dry season is coming.",
      "Hills are green and firm. Take a real loop if you have one nearby.",
      "Sit low, out of the wind, and watch a slope."
    ),
    5: m(
      ["hills bleaching from green toward gold", "jasmine or citrus blossom left over in yards"],
      ["swallows", "a mockingbird at dawn"],
      ["dust on a shoe"],
      ["tomatoes if they are not already in", "beans"],
      ["strawberries", "the last greens"],
      ["lettuce", "heavy new plantings that will want daily water"],
      "Mulch. Water deep and less often. Let the hills go gold.",
      "Morning, before the glare. Carry water.",
      "Shade by late morning. Sun only if you want the heat."
    ),
    6: m(
      ["gold hills", "oak shade as the real path"],
      ["doves", "almost no frogs"],
      ["dry grass seed heads"],
      [],
      ["tomatoes", "stone fruit if it is yours"],
      ["lettuce", "planting a thirsty new bed"],
      "Harvest, water deep, and do not start cool crops.",
      "Dawn or evening. The middle of the day is a glare.",
      "Sit in oak shade and watch the heat shimmer and then stop watching it."
    ),
    7: m(
      ["dry gold everywhere that is not irrigated", "figs ripening on neighborhood trees"],
      ["a quiet afternoon", "crows moving"],
      ["dust, and the cool of a thick fig leaf if one is in reach"],
      [],
      ["tomatoes", "figs", "basil"],
      ["planting", "midday trails with no shade"],
      "Keep fruit picked and beds mulched. This is the dormant month for new sowing.",
      "A short shaded walk. Turn around in the sun.",
      "Evening only, when the walls start giving heat back."
    ),
    8: m(
      ["the same gold, a little duller", "the first marine layer if you are on the coast"],
      ["crickets at night", "crows"],
      ["a tomato bed that is either thriving or done"],
      [],
      ["tomatoes", "peppers", "figs"],
      ["lettuce", "a big dig in dust"],
      "Get beds ready for fall, and wait to sow until the soil cools or the first rain.",
      "Coastal fog is a gift. Inland, go at dawn.",
      "Sit where a breeze can find you."
    ),
    9: m(
      ["a slightly lower sun", "toyons setting fruit"],
      ["the first white-crowned sparrows late in the month", "crickets"],
      ["soil that is cooler at dawn"],
      ["a first sowing of greens late in the month, if nights have cooled"],
      ["the last tomatoes", "peppers", "figs"],
      ["a huge tomato planting", "ignoring dry mulch"],
      "Harvest summer. Sow only when the soil is actually cool.",
      "You can walk later in the day than in July. Still carry water inland.",
      "Sit out for the sunset. It is doing more of the work now."
    ),
    10: m(
      ["hills waiting to turn from gold toward green", "toyon setting red fruit", "coast live oak, unchanged"],
      ["crows moving to roost", "white-crowned sparrows back in the neighborhood"],
      ["cool soil after a dry summer", "dry grass seed heads"],
      ["garlic", "fava beans", "peas", "lettuce", "spinach", "cilantro"],
      ["the last tomatoes", "peppers", "figs"],
      ["leaving beds bare if rain is forecast"],
      "The rains are the starting gun. Sow cool crops now.",
      "A loop with one hill. Turn around while the light is still easy.",
      "Sit where you can smell the first wet dust, if it has rained."
    ),
    11: m(
      ["the first green on a bank after rain", "persimmons and pomegranates in yards"],
      ["sparrows", "frogs if the rain was real"],
      ["soil that holds a print"],
      ["more greens", "garlic", "fava beans", "onions"],
      ["persimmons when soft", "pomegranates", "greens"],
      ["walking a muddy hillside off trail", "mushrooms as food"],
      "Keep sowing. Mushrooms are for looking, never for the pan. Stay on the path.",
      "After rain, use sidewalks and firm paths. Skip the greasy trail.",
      "Sit under an eave if it is raining. The rain is the outing."
    ),
    12: m(
      ["citrus bright against gray days", "greens thick in a winter bed"],
      ["sparrows", "a hummingbird on a salvia"],
      ["cold soil in the Central Valley morning, mild on the coast"],
      ["lettuce", "peas", "fava beans", "onions"],
      ["citrus", "broccoli", "kale"],
      ["tomatoes", "forgetting that a valley frost is still possible"],
      "This is a planting and picking month. Cover tender plants only if you are in a frost pocket.",
      "A gray walk is still a walk. Take the block with citrus.",
      "Sit out of the wind and watch one tree."
    )
  },
  marine: {
    1: m(
      ["bare alder and maple", "cedar and sword fern still deep green"],
      ["a Pacific wren in the thicket", "rain on a hood"],
      ["wet bark", "soil that should not be walked into mud"],
      [],
      ["kale", "leeks"],
      ["digging saturated soil", "tomatoes"],
      "Leave the beds. Walk, and note what the rain is pooling on.",
      "Sidewalks and park paths. The forest floor is not a shortcut when it is soaked.",
      "Stand under a cedar and listen to the canopy."
    ),
    2: m(
      ["Indian plum blooming in the understory", "hellebore in yards"],
      ["song sparrows", "frogs on a mild night"],
      ["cold wet soil"],
      ["peas in a raised bed that actually drains", "onion sets"],
      ["kale", "sprouting broccoli"],
      ["tomatoes", "compacting wet beds"],
      "Prune a fruit tree on a dry afternoon. Sow only in soil that does not smear.",
      "A damp walk is the season. Turn around if your shoes start taking on water.",
      "Find a dry bench under cover and listen."
    ),
    3: m(
      ["salmonberry flower", "red-flowering currant"],
      ["Pacific tree frogs", "a varied thrush if you are near woods"],
      ["soil that still smears in the hand"],
      ["peas", "potatoes", "lettuce in a covered bed"],
      ["kale", "green onion"],
      ["tomatoes", "digging the wet ground"],
      "Sow in containers or raised beds if the ground is still soup. Wait on the rest.",
      "Park paths, not informal trails that have become creeks.",
      "Sit where you can hear frogs and traffic, and notice which one you follow."
    ),
    4: m(
      ["trillium on a known public trail", "bigleaf maple flowers"],
      ["swallows back", "frogs"],
      ["soil finally starting to crumble on a dry day"],
      ["potatoes", "brassicas", "peas", "lettuce"],
      ["asparagus", "rhubarb"],
      ["tomatoes before mid-month in colder spots", "walking off a soft trail"],
      "Get the cool crops in on a dry day. Slugs will find them. Look at night if you must.",
      "You can take a real park loop if the path is firm.",
      "Sit near maple flowers and look up."
    ),
    5: m(
      ["rhododendron", "camas in wet meadows you do not step into"],
      ["swainson's thrush arriving", "swallows"],
      ["less squelch underfoot, most days"],
      ["tomatoes after the frost date", "beans", "basil in a warm spot"],
      ["lettuce", "peas"],
      ["planting into a cold wet week"],
      "Set out tender plants only after the frost date, in your warmest spot, and mulch.",
      "The long evening is the walk. Take it.",
      "Sit out late. The light lasts."
    ),
    6: m(
      ["berries forming", "foxglove on roadsides, left alone"],
      ["swainson's thrush", "a robin early"],
      ["damp mulch and the slugs under it"],
      ["beans", "a short row of basil"],
      ["strawberries", "lettuce", "peas"],
      ["letting slugs take the whole bed without a look"],
      "Harvest, mulch, and check leaves for what is eating them. Water if a dry spell actually arrives.",
      "Long light. Take the loop you have been saving.",
      "Sit until the thrush starts, if you are near woods."
    ),
    7: m(
      ["berries ripe along public edges", "dry grass on a south bank, a surprise here"],
      ["a quieter dawn", "swallows still"],
      ["dust, for once, on some paths"],
      ["a fall sowing of kale late in the month"],
      ["berries", "beans", "lettuce that has not bolted"],
      ["a bonfire on a dry bank", "picking berries from a private hedge"],
      "Water if it has actually been dry. Start thinking about fall greens.",
      "Take water on a long loop. The dry spell is real until it is not.",
      "Sit in the shade of a big leaf and stay past the point of boredom."
    ),
    8: m(
      ["blackberries", "the first sense of smoke in a bad fire year, which means you go home"],
      ["crickets", "goldfinches"],
      ["warm soil, unusual and worth noticing"],
      ["kale", "spinach", "lettuce for fall"],
      ["blackberries on public edges", "beans", "tomatoes"],
      ["a hike into smoke", "leaving beds bare before the rains"],
      "Sow fall greens now. If the air smells like smoke, the outing is indoors.",
      "Morning, before the day heats. Turn around if the air is harsh.",
      "Sit and eat nothing wild except what you grew or bought."
    ),
    9: m(
      ["the first yellow bigleaf maple leaves", "mushrooms in wood chips, look only"],
      ["crickets", "geese"],
      ["the return of damp"],
      ["garlic late in the month", "cover crop", "more greens"],
      ["apples", "tomatoes", "the last berries"],
      ["eating wild mushrooms", "digging after a soaking rain"],
      "Pull tired summer plants. Garlic can go in as the rains return. Mushrooms stay where they are.",
      "Welcome the rain and stay on the path.",
      "Stand under a maple and listen to one leaf hit at a time."
    ),
    10: m(
      ["bigleaf maple dropping hand-sized leaves", "sword fern after rain", "mushrooms at the edge of wood chips, look only"],
      ["Pacific wrens in the thicket", "rain on leaves"],
      ["wet bark", "soil that sticks: do not dig it"],
      ["garlic", "fava beans", "a cover crop", "spinach in a covered bed"],
      ["kale", "leeks", "apples if the tree is yours"],
      ["tomatoes", "walking off trail onto a wet slope", "eating mushrooms"],
      "Cover bare beds before the rain packs them. Garlic can go in. Do not dig soil that sticks.",
      "Sidewalks and park paths. A wet forest floor is not a shortcut.",
      "Stand under a cedar and listen to the canopy instead of the street."
    ),
    11: m(
      ["leaves down, cedar and fern still full", "a public river overlook if you already know one"],
      ["rain", "juncos", "a wren"],
      ["cold wet hands, which is the season"],
      ["garlic if it is not already in", "fava beans"],
      ["kale", "leeks", "Brussels sprouts"],
      ["tomatoes", "trail shortcuts in mud"],
      "Mulch. Harvest greens. Stay off soft ground.",
      "A wet sidewalk loop counts. Do not invent a trail.",
      "A covered seat and the sound of rain is a complete outing."
    ),
    12: m(
      ["dark cedars at three in the afternoon", "moss doing the work"],
      ["rain", "a few chickadees"],
      ["water on everything"],
      [],
      ["kale", "leeks"],
      ["digging", "a long off-trail walk"],
      "Rest. Harvest a green if you want one. Leave the soil.",
      "Go out in the brightest hour, even if it is raining, and come back.",
      "Five minutes under an eave is enough on a hard rain day."
    )
  },
  tropical: {
    1: m(
      ["dry-season light, harder and clearer", "poinsettias finishing"],
      ["doves", "a mockingbird"],
      ["soil that finally dries between waterings"],
      ["tomatoes", "peppers", "basil", "beans", "herbs"],
      ["citrus", "greens", "herbs"],
      ["talking about frost", "midday sun without a hat"],
      "This is one of the best planting months. There is no frost to wait for.",
      "You can walk in the day. Take water anyway.",
      "Sit in a breeze, not in a closed courtyard."
    ),
    2: m(
      ["frangipani still bare or just budding", "clear mornings"],
      ["doves", "parrots if the neighborhood has them"],
      ["warm pavement, cool shade"],
      ["tomatoes", "peppers", "basil", "cucumbers"],
      ["citrus", "beans", "herbs"],
      ["a frost plan", "forgetting water on a windy day"],
      "Keep planting the dry-season garden. Water when the soil is dry a knuckle down.",
      "Morning or late day. The sun is direct.",
      "Shade and one flowering thing."
    ),
    3: m(
      ["the light still dry", "new growth on trees that rested"],
      ["a louder dawn", "doves"],
      ["warmth that does not break at night"],
      ["beans", "okra", "sweet potatoes", "basil"],
      ["tomatoes", "peppers"],
      ["cool-season crops that will bolt immediately", "lettuce in the sun"],
      "Shift toward heat crops. Lettuce is a waste of a bed unless you have real shade.",
      "Walk early. The pleasant dry season is shortening.",
      "Sit at sunrise and notice the humidity coming back."
    ),
    4: m(
      ["royal poinciana leafing or flowering, by the tree", "thick new green"],
      ["thunder building", "coquis or frogs after a shower"],
      ["humidity on your wrists"],
      ["okra", "sweet potatoes", "cowpeas", "basil"],
      ["beans", "tomatoes before the wet season really sets"],
      ["lettuce", "a long midday sit with no shade"],
      "Plant what likes heat and rain. Start keeping an eye on the sky.",
      "Go out before the afternoon storms set up.",
      "A porch and an arriving shower count."
    ),
    5: m(
      ["mango trees in fruit where people grow them", "heavy green"],
      ["rain on broad leaves", "a thick dawn"],
      ["air you can feel on your skin before you move"],
      ["okra", "sweet potatoes", "heat herbs"],
      ["mangoes if they are yours", "beans"],
      ["lettuce", "scheduling a long outing at noon"],
      "Harvest early. Do not start a project you cannot finish before the storm.",
      "A short early walk. Home before the build of the clouds.",
      "Watch one storm. That is the outside time."
    ),
    6: m(
      ["wet-season green at full thickness", "standing water after rain, left alone"],
      ["afternoon thunder", "doves early"],
      ["rain-cooled skin, then humidity again"],
      ["okra", "malabar spinach", "sweet potatoes"],
      ["bananas if a stalk on your plant is ready", "herbs"],
      ["lettuce", "wading into floodwater", "midday hikes"],
      "Keep the heat crops picked. Stay out of floodwater.",
      "Dawn only, and not under a sky that is already dark.",
      "A covered chair and the rain."
    ),
    7: m(
      ["the same deep green", "flowers knocked down by rain"],
      ["thunder most days", "frogs at night"],
      ["nothing stays dry"],
      ["a few heat herbs in a pot under cover"],
      ["okra", "sweet potato leaves if you grow them to eat and know the variety"],
      ["a new in-ground bed in a downpour", "ignored lightning"],
      "Maintain, do not expand. If you hear thunder, you are done outside.",
      "Skip the walk if the sky is already stacked. Tomorrow morning.",
      "Indoors with the door open is a legitimate sit this month."
    ),
    8: m(
      ["peak wet season", "branches down after a squall"],
      ["cicadas or their local stand-in", "hard rain"],
      ["wind before a storm, which is a signal to go in"],
      [],
      ["okra", "bananas"],
      ["a long outing in hurricane season weather", "planting a new bed"],
      "If a storm is forecast, the outing is securing pots and going inside. Otherwise, dawn only.",
      "Ten minutes, early, close to home.",
      "Watch the sky more than the garden."
    ),
    9: m(
      ["wet green with a few drier mornings", "poinciana pods"],
      ["less constant thunder late in the month", "doves"],
      ["a morning that is only warm, not punishing"],
      ["tomatoes for the dry season", "peppers", "beans"],
      ["okra", "sweet potatoes"],
      ["ignoring a tropical forecast", "lettuce in full sun"],
      "Start the dry-season tomatoes as the rains ease. Keep one eye on the forecasts.",
      "You can walk a little later. Still early is better.",
      "Sit in a breeze and plan the dry-season bed."
    ),
    10: m(
      ["wet-season green starting to ease", "royal poinciana seed pods", "waterbirds in a roadside canal"],
      ["doves", "less afternoon thunder than in September"],
      ["humidity on your wrists", "soil that still holds yesterday's rain"],
      ["tomatoes for the dry season", "beans", "peppers", "basil"],
      ["sweet potatoes", "herbs", "okra if it is still giving"],
      ["treating this month like a frost warning", "eating canal fish from a casual recommendation"],
      "Hurricane season is fading, not a reason to shut the garden. This is a planting month.",
      "Go early, before the heat stacks up. Carry water. Keep the phone pocketed.",
      "Shade, a breeze if you can find one, and one bird."
    ),
    11: m(
      ["clearer mornings", "the landscape looking washed and then bright"],
      ["a drier dawn chorus", "doves"],
      ["soil you can work without coming up muddy"],
      ["tomatoes", "peppers", "beans", "cucumbers", "herbs", "greens in light shade"],
      ["sweet potatoes", "bananas", "herbs"],
      ["waiting for spring", "frost talk"],
      "Plant freely. The dry season is the easy season, and it is starting.",
      "The day is kind again. Take a real loop and bring water.",
      "Sit in the sun on purpose. You may have missed it."
    ),
    12: m(
      ["holiday poinsettias and, more usefully, tomatoes setting fruit", "clear light"],
      ["doves", "a mockingbird"],
      ["pleasant air in the shade, real sun in the open"],
      ["more herbs", "beans", "greens", "another tomato if you have room"],
      ["tomatoes", "peppers", "herbs"],
      ["shutting beds for a winter that is not coming"],
      "Harvest and keep sowing. December is garden season.",
      "Go at the hour you actually like. Stay longer than the card suggests if you want.",
      "A long sit is the point. The weather is on your side."
    )
  }
};
