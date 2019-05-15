### Carousel

* `value` \- active index of the slider, use v-model to two-way binding
* `height` \- the height of carousel-item, 'auto' or a number
* `autoplay` \- enable auto play
* `autoplaySpeed` \- time interval of the auto play
* `easing` \- animation effects of transition, same as css3
* `duration` \- time duration of transition 
* `arrow` \- how to show arrow 
* `dots` \- dots position
* `trigger` \- the way to activate the indicator

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | number   | 0            | -             |
| height     | string/number | auto    | -             |
| autoplay   | boolean  | false        | -             |
| autoplay-speed | number| 2000        | -             |
| easing     | string   | ease         | -             |
| duration   | number   | 500          | -             |
| arrow      | string   | hover        | hover/always/none |
| dots       | string   | inside       | inside/outside/none |
| trigger    | string   | click        | click/hover   |
