<template>
  <div class="main-container-outer">
    <div class="main-container-inner">
			<div class="main-container-inner-box">
				<clock-title/>

				<clock/>

				<clock-operate/>
			</div>
		</div>
      
		<p class="product-name">
			PODOMORO
		</p>
  </div>
</template>

<script>
import ClockTitle from './ClockTitle';
import Clock from './Clock';
import ClockOperate from './ClockOperate';

export default {
  components: {
		ClockTitle,
		Clock,
		ClockOperate,
	},
}
</script>