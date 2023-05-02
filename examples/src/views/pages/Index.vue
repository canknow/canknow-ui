<template>
    <div>
        <div class="image-layout" id="site-banner">
            <img src="./../../assets/images/star-bg.svg"/>
            <div class="image-layout-body">
                <div class="container site-description">
                    <h1>Classic modular front-end framework</h1>
                    <p>The front end UI solution for all levels of the front and back apes, the zero threshold open, and the front end for all levels</p>
                </div>
            </div>
        </div>
        <div class="container-responsive">
            <div class="section">
                <div class="text-center margin-bottom-3">
                    <h2>Canknow makes designing easy and performance fast</h2>
                </div>
                <c-row :gutter="2">
                    <c-column :md="8">
                        <div class="text-center">
                            <h3 class="h5">Professional Design</h3>
                            <p>Achieve virtually any design and layout from within the one template.</p>
                        </div>
                    </c-column>
                    <c-column :md="8">
                        <div class="text-center">
                            <h3 class="h5">Front Strategy</h3>
                            <p>We strive to figure out ways to help your business grow through all platforms.</p>
                        </div>
                    </c-column>
                    <c-column :md="8">
                        <div class="text-center">
                            <h3 class="h5">Unlimited Power</h3>
                            <p>Find what you need in one template and combine features at will.</p>
                        </div>
                    </c-column>
                </c-row>
            </div>
        </div>

        <div class="section">
            <c-row>
                <c-column :md="12" class="text-center padding-2 banner-title-wrapper">
                    <h2>{{author}} DESIGNs</h2>
                    <p><span>Out of the box with china front design solutions</span></p>
                </c-column>
                <c-column :md="12" class="text-center padding-2">
                    <img class="width-full" src="./../../assets/images/cross-platform.svg">
                </c-column>
            </c-row>
        </div>
        <div class="container">
            <div class="content-wrapper margin-top-2">
                <div class="text-wrapper-bottom">
                    <c-row>
                        <c-column :md="12">
                            <img class="width-full center-block" src="./../../assets/images/developers-at-desk.svg">
                        </c-column>
                        <c-column :md="12">
                            <h2 class="text-center"><span>Small. Determination. Happiness</span></h2>
                            <p class="text-center margin-bottom-2"><span>This is a medium - background design language dedicated to improving the use of "users" and "designers".</span></p>
                        </c-column>
                    </c-row>
                </div>
                <div class="image4 bottom-wrapper"></div>
            </div>
        </div>
    </div>
</template>
<script>
import packageConfig from './../../../../package';

export default {
  name: 'Index',
  computed: {
    author: ()=>{
      return packageConfig.author;
    },
    name: ()=>{
      return packageConfig.name;
    }
  },
  mounted(){
  }
};
</script>
<style lang="scss">
    #site-banner{
        height: 640px;
        overflow: hidden;
        background-color: #24292e;
        background-size: 100%;
        text-align: center;
        margin: 0;
        position: relative;

        .image-layout-body{
            padding-top: 169px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;

            .site-description{
                h1{
                    color:#fff;
                }
                h2{
                    color:#fff;
                }
                p{
                    color:#fff;
                }
            }
        }
        .canvas-box{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
        }
    }
</style>
