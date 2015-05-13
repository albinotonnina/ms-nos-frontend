define(function (require){
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/BackgroundView.hbs'),

        renderer: undefined,
        container: undefined,
        camera: undefined,
        scene: undefined,
        particles: undefined,
        geometry: undefined,
        material: undefined,
        sprite: undefined,
        mouseX: 0,
        mouseY: 0,
        windowHalfX: undefined,
        windowHalfY: undefined,

        /** @private */
        _initializeParticles: function (){
            this.container = this.$el.get(0);
            this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
            this.camera.position.z = 1000;
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2(0xffffff, 0.001);
            this.geometry = new THREE.Geometry();
            this.sprite = THREE.ImageUtils.loadTexture('/static_files/images/disc.png');

            for(var i = 0; i < 10000; i++){
                var vertex = new THREE.Vector3();
                vertex.x = 2000 * Math.random() - 1000;
                vertex.y = 2000 * Math.random() - 1000;
                vertex.z = 2000 * Math.random() - 1000;
                this.geometry.vertices.push(vertex);
            }

            this.material = new THREE.PointCloudMaterial({
                opacity: 0.15,
                size: 35,
                sizeAttenuation: false,
                map: this.sprite,
                transparent: true
            });
            this.material.color.setRGB(60 / 100, 63 / 100, 120 / 100);

            this.particles = new THREE.PointCloud(this.geometry, this.material);
            this.scene.add(this.particles);

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setClearColor(0xededf2, 0);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.container.appendChild(this.renderer.domElement);

            document.addEventListener('mousemove', _.bind(this._onDocumentMouseMove, this), false);
            document.addEventListener('touchstart', _.bind(this._onDocumentTouchStart, this), false);
            document.addEventListener('touchmove', _.bind(this._onDocumentTouchMove, this), false);
            window.addEventListener('resize', _.bind(this._onWindowResize, this), false);
        },

        /** @private */
        _onDocumentMouseMove: function (event){
            this.mouseX = event.clientX - this.windowHalfX;
            this.mouseY = event.clientY - this.windowHalfY;
        },

        /** @private */
        _onDocumentTouchStart: function (event){
            if(event.touches.length == 1){
                event.preventDefault();
                this.mouseX = event.touches[0].pageX - this.windowHalfX;
                this.mouseY = event.touches[0].pageY - this.windowHalfY;
            }
        },

        /** @private */
        _onDocumentTouchMove: function (event){
            if(event.touches.length == 1){
                event.preventDefault();
                this.mouseX = event.touches[0].pageX - this.windowHalfX;
                this.mouseY = event.touches[0].pageY - this.windowHalfY;
            }
        },

        /** @private */
        _onWindowResize: function (){
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },

        /** @private */
        onRender: function (){
            this._initializeParticles();
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this._animate();
        },

        /** @private */
        _animate: function (){
            var self = this;
            animate();

            function animate(){
                setTimeout(function (){
                    requestAnimationFrame(animate);
                }, 1000 / 20);
                self._renderParticles();
            }
        },

        /** @private */
        _renderParticles: function (){
            this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
            this.camera.position.y += ( -this.mouseY - this.camera.position.y ) * 0.05;
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
        },

        /** @private */
        onDestroy: function (){
            document.removeEventListener('mousemove', _.bind(this._onDocumentMouseMove, this), false);
            document.removeEventListener('touchstart', _.bind(this._onDocumentTouchStart, this), false);
            document.removeEventListener('touchmove', _.bind(this._onDocumentTouchMove, this), false);
        }
    });

});