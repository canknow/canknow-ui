<template>
    <div class="error-page error-page-404 flex-vertical flex-center">
        <div class="error-page-header">
            <img height="24" class="logo" src="image/title-logo.png"  alt=""/>
        </div>
        <div class="error-body">
            <c-row>
                <c-column span="12" offset="4">
                    <h1 class="error-title text-primary font-weight-bold">Page not found</h1>
                    <p class="error-message">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
                </c-column>
            </c-row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ErrorPage'
};
</script>
