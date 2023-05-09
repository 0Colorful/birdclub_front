<template>
    <div class="carousel">
        <el-carousel :interval="4000" type="card" height="350px" autoplay class="carousel-content">
            <el-carousel-item>
                <img src="@/assets/images/014541r04tnn5us09z9m9u.jpg_birdCover.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/images/142145umgayh5fq53hxna5.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/images/144347i2eqzo3edp4pld1e.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/images/150449x1ubuga18u318cey.jpg" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>

</script>
<style lang="scss" scoped>

.carousel {
    margin-top: 20px;
    margin-bottom: 20px;
    .carousel-content {
        width: 100%;
        max-height: 640px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}


</style>