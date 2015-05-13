define(function (require){
    'use strict';

    var Marionette = require('marionette');


    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/BackgroundView.hbs'),

        /** @private */
        ui: {
            background: '#background'
        },

        events: {},

        /** @private */
        initialize: function (){

        },

        onShow: function (){



        },


        /** @private */
        onRender: function (){


            var self = this;

            var container;
            var camera, scene, renderer, particles, geometry, material, i, h, sprite;
            var mouseX = 0, mouseY = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            init();
            animate();

            function init(){

                container = self.$el.get(0);
                camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
                camera.position.z = 1000;

                scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2(0xffffff, 0.001);

                geometry = new THREE.Geometry();

                sprite = THREE.ImageUtils.loadTexture('/static_files/images/disc.png');

                for(i = 0; i < 10000; i++){

                    var vertex = new THREE.Vector3();
                    vertex.x = 2000 * Math.random() - 1000;
                    vertex.y = 2000 * Math.random() - 1000;
                    vertex.z = 2000 * Math.random() - 1000;

                    geometry.vertices.push(vertex);

                }

                material = new THREE.PointCloudMaterial({
                    opacity: 0.1,
                    size: 35,
                    sizeAttenuation: false,
                    map: sprite,
                    transparent: true
                });
                material.color.setHSL(1.0, 0.3, 0.7);

                particles = new THREE.PointCloud(geometry, material);
                scene.add(particles);

                //

                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setClearColor(0xededf2, 0);
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.appendChild(renderer.domElement);

                //


                document.addEventListener('mousemove', onDocumentMouseMove, false);
                document.addEventListener('touchstart', onDocumentTouchStart, false);
                document.addEventListener('touchmove', onDocumentTouchMove, false);

                //

                window.addEventListener('resize', onWindowResize, false);

            }

            function onWindowResize(){

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);

            }

            function onDocumentMouseMove(event){

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            }

            function onDocumentTouchStart(event){

                if(event.touches.length == 1){

                    event.preventDefault();

                    mouseX = event.touches[0].pageX - windowHalfX;
                    mouseY = event.touches[0].pageY - windowHalfY;

                }
            }

            function onDocumentTouchMove(event){

                if(event.touches.length == 1){

                    event.preventDefault();

                    mouseX = event.touches[0].pageX - windowHalfX;
                    mouseY = event.touches[0].pageY - windowHalfY;

                }

            }

            //

            function animate(){


                setTimeout(function (){

                    requestAnimationFrame(animate);

                }, 1000 / 20);

                render();

            }

            function render(){

                var time = Date.now() * 0.00005;

                camera.position.x += ( mouseX - camera.position.x ) * 0.05;
                camera.position.y += ( -mouseY - camera.position.y ) * 0.05;

                camera.lookAt(scene.position);

                h = ( 360 * ( 1.0 + time ) % 360 ) / 360;


                //console.log(h);

                // material.color.setHSL( 0.0189, 0.29, 0.39 );
                material.color.setRGB(60 / 100, 63 / 100, 120 / 100);


                renderer.render(scene, camera);

            }


        },

        /** @private */
        onDestroy: function (){


        }
    });

});