import EventEmitter from '../eventEmitter/EventEmitter.js';
import * as THREE from 'three';
import { OrbitControls } from '../../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from '../../../../../../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from '../../../../../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../../../../../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../../../../../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../../../../../../node_modules/three/examples/jsm/postprocessing/OutputPass.js';
import { GUI } from '../../../../../../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import tippy, {followCursor} from 'tippy.js';
import { isDesktop } from '../helpers/helpers.js';
import { closeIcon } from '../../assets/icons.js';
//EffectComposer RenderPass UnrealBloomPass OutputPass

const vShader = `
    varying vec3 vNormal;
    void main() 
    {
    vNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const fShader = `

varying vec3 vNormal;
void main() 
{
	float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0); 
    gl_FragColor = vec4(0.56, 0.68, 0.82, 0.4) * intensity;
}
`;


const $mobileLink = `
    <div class="s3d-earth__mob-link">
        <button class="s3d-earth__mob-link-close" onclick="this.closest('.s3d-earth__mob-link').remove()">
            ${closeIcon()}
        </button>
        <button class="js-s3d-nav__btn s3d-infoBox__link" data-type="map" onclick="setTimeout(() => {document.querySelectorAll('.s3d-earth__mob-link').forEach(el => el.remove())}, 300)">Trojena</button>
    </div>
`;

var vertexShader = `
    varying vec3 vNormal;
    void main() 
    {
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;
  
  var fragmentShader = `
  varying vec3 vNormal;
    void main() 
    {
        float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 ); 
        gl_FragColor = vec4( 0.0, 0.0, 1.0, 1.0 ) * intensity;
    }`;

export default class Earth extends EventEmitter {
    constructor(params) {
        super();
        this.wrapper = document.querySelector('.js-s3d__wrapper__earth');
        this.inited = false;
        this.parent = params.model;

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        this.goToScreen = this.goToScreen.bind(this);
        this.initEvents();
        
        this.INTERSECTED = undefined;
        this.params = {
            threshold: 0,
            strength: 0,
            radius: 0,
            exposure: 0
        };

        this.tooltip = false;
        this.initTutorial();
    }

    onPointerMove( event ) {    
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    initEvents() {
        this.parent.on('updateFsm', (data) => {
            if (!this.inited && !data.type) {
                this.initScene();
                this.initNavigation();
                return;
            }
            if (!this.inited && data.type === 'earth') {
                this.initScene();
                this.initNavigation();
                return;
            } 
            if (this.inited && !data.type) {
                this.renderer.setAnimationLoop(this.animation);
                return;
            }
            if (this.inited && data.type === 'earth') {
                this.renderer.setAnimationLoop(this.animation);
                return;
            }
            if (data.type !== 'earth' && this.inited) {
                this.renderer.setAnimationLoop(null);
            }
        })
    }

    createPin() {
        const geometry = new THREE.CircleGeometry( 0.1, 32 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00, reflectivity: 0.5 } ); 
        const circle = new THREE.Mesh( geometry, material ); 
        circle.position.y = -1;
        // sceneToAdd.add( circle );
        return circle;
    }

    async loadObject(sceneToAdd) {

        const geo = new THREE.SphereGeometry(0.49, 32, 64);
        const mat = new THREE.MeshStandardMaterial({
            displacementMap: new THREE.TextureLoader().load(
                `${window.defaultModulePath}/images/x1um653wa2r8hw9pn64drm8aljvv.jpg`
            ),
            displacementScale: 0.01,
            roughnessMap: new THREE.TextureLoader().load(
                `${window.defaultModulePath}/images/EARTH_4K.jpg`
                ),
                map: new THREE.TextureLoader().load(
        `${window.defaultModulePath}/images/EARTH_4K.jpg`
        ),
        // flatShading: false,
        bumpScale: 0.005,
        bumpMap: new THREE.TextureLoader().load(
            `${window.defaultModulePath}/images/EARTH_4K.jpg`
            ),
            roughness: 1,
            opacity: 0.5
            // reflectivity: 0.1,
        });
                    
                    const mish = new THREE.Mesh(geo,mat);
                    mish.name = 'planet';


        mish.rotation.x = -0.5185;
        mish.rotation.y = -0.9235;
        mish.rotation.z = -0.761;    
        // mish.rotation.y = -1.45;
        window.mish = mish;
        sceneToAdd.add(mish);
        // sceneToAdd.add(this.createEarthBloom());


        sceneToAdd.add(this.createClouds());

        // sceneToAdd.add(obj);
    }

    createEarthBloom() {
        var customMaterial = new THREE.ShaderMaterial({
                uniforms: { 
                    "c":   { type: "f", value: 1.0 },
                    "p":   { type: "f", value: 1.4 },
                    glowColor: { type: "c", value: new THREE.Color('#65bafb') },
                    viewVector: { type: "v3", value: camera.position }
                },
                vertexShader:   `uniform vec3 viewVector;
                    uniform float c;
                    uniform float p;
                    varying float intensity;
                    void main() 
                    {
                        vec3 vNormal = normalize( normalMatrix * normal );
                        vec3 vNormel = normalize( normalMatrix * viewVector );
                        intensity = pow( c - dot(vNormal, vNormel), p );
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                    }
                `,
                fragmentShader: `
                    uniform vec3 glowColor;
                    varying float intensity;
                    void main() 
                    {
                        vec3 glow = glowColor * intensity;
                        gl_FragColor = vec4( glow, 0.15 );
                    }
                `,
                side: THREE.FrontSide,
                blending: THREE.AdditiveBlending,
                transparent: true
	    });
        const geo = new THREE.SphereGeometry(0.52, 32, 64);
        const mesh = new THREE.Mesh( geo, customMaterial.clone());
        mesh.name = 'glow';
        return mesh;
    }

    createClouds() {
        
        const geo = new THREE.SphereGeometry(0.50, 32, 64);
        const mat = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(
                `${window.defaultModulePath}/images/Earth_Clouds_6K_fix.jpg`
            ),
            alphaMap: new THREE.TextureLoader().load(
                `${window.defaultModulePath}/images/Earth_Clouds_6K_fix.jpg`
            ),
            bumpMap: new THREE.TextureLoader().load(
                `${window.defaultModulePath}/images/Earth_Clouds_6K_fix.jpg`
            ),
            bumpScale: 0.12,
            depthTest: false,
            blending: THREE.CustomBlending,
            // alphaTest: 0.25
        });
        const mesh = new THREE.Mesh(geo,mat);
        mesh.name = 'clouds';
        return mesh;
    }

    async initScene() {
        const self = this;
        let camera, scene, renderer;
        let geometry, material, mesh, composer;
        
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 6000 );
        camera.position.z = 1.5;
        window.camera = camera;
    
        scene = new THREE.Scene();


        scene.add( self.createBlumSphere() );

        self.createSpaceSphere(scene);
        self.createSun(scene);

        // const hemiLight = new THREE.HemisphereLight( '#fedfb4', '#ffc800', 0 ); 

        scene.add( self.addInnerPin());
        scene.add( self.addPin());
        scene.add( self.addLight());
        // scene.add( hemiLight);
        
        const ambient = new THREE.AmbientLight('#ffffff', 0.85);
        scene.add( ambient );
    
        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true,  preserveDrawingBuffer: true } );
        renderer.setClearColor( 0x000000, 0 ); 
        renderer.setSize( window.innerWidth, window.innerHeight );
        const controls = new OrbitControls(camera, renderer.domElement);

        controls.minPolarAngle = Math.PI/2;
        controls.maxPolarAngle = Math.PI/2;
        controls.minDistance = 1.25;
        controls.maxDistance = 1.45;

        scene.rotation.y = -0.9;

        self.loadObject(scene);

        renderer.setAnimationLoop( animation );
        self.inited = true;
        self.renderer = renderer;
        self.controls = controls;
        self.camera = camera;
        self.scene = scene;
        self.wrapper.appendChild( renderer.domElement );
        window.scene = scene;

        // window.addEventListener( 'pointermove', self.onPointerMove.bind(self) );

        window.addEventListener('resize', function(){
            var width = window.innerWidth;
            var height = window.innerHeight;
            renderer.setSize( width, height );
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
        
        
        if (!isDesktop()) {
            document.body.addEventListener( 'click', self.onPointerMove.bind(self) );
        } else {
            window.addEventListener( 'pointermove', self.onPointerMove.bind(self) );
        }

        self.guiHelpers(scene);
        
        self.rotation();

        function animation( time ) {
            self.raycaster.setFromCamera( self.pointer, camera );
            const intersects = self.raycaster.intersectObjects( scene.children );

            const clouds = self.scene.children.find(el => el.name === 'clouds');
            if (clouds) {
                clouds.rotation.y += 0.0005;
            }

            const glow = self.scene.children.find(el => el.name === 'glow'); 
            if (glow) {
                glow.lookAt(camera.position);
            }
            const sun = self.scene.children.find(el => el.name === 'sun'); 
            if (sun) {
                sun.lookAt(camera.position);
            }
            

            if (self.isRotatingClockwise) {
                self.controls.autoRotateSpeed = 4; // Збільшуємо швидкість автоматичної обертання
                self.controls.update();
              }
            
              if (self.isRotatingCounterClockwise) {
                self.controls.autoRotateSpeed = -4; // Зменшуємо швидкість автоматичної обертання
                self.controls.update();
              }
            if ( intersects.length > 0 ) {
                if (intersects[ 0 ].object.name.match(/pin|Cylinder001/)) {
                    self.enableHover();
                } else {
                    self.disableHover();
                }
                
            } else {
                self.disableHover();
            }

            const objectPin = self.scene.children.find(el => el.name === 'pin');

            if (objectPin) {
                objectPin.lookAt(camera.position);
            }
            if (self.renderer) self.renderer.render(self.scene, self.camera);
        }

        this.animation = animation;
    }


    guiHelpers(scene) {
        if (document.documentElement.dataset.mode !== 'local' || !window.location.href.match(/localhost/)) return;
        setTimeout(() => {
            const gui = new GUI()
            const cubeFolder = gui.addFolder('Cube')
            cubeFolder.add(scene.children[3].rotation, 'x', Math.PI * -2, Math.PI * 2)
            cubeFolder.add(scene.children[3].rotation, 'y', Math.PI * -2, Math.PI * 2)
            cubeFolder.add(scene.children[3].rotation, 'z', Math.PI * -2, Math.PI * 2)
            cubeFolder.open();

            if (scene.children.find(el =>  el.name === 'clouds')) {
                const group = scene.children.find(el => el.name === 'clouds');
                const cubeFolderPin = gui.addFolder('clouds');
                cubeFolderPin.add(group.material, 'bumpScale', 0, 1.5)
            }
            if (scene.children.find(el => el.type === 'Group')) {
                const group = scene.children.find(el => el.type === 'Group');
                const cubeFolderPin = gui.addFolder('Cube');
                const cubeScalePin = gui.addFolder('Cube Scale');
                const cubeRotationPin = gui.addFolder('Cube Rotation');
                cubeFolderPin.add(group.position, 'x', Math.PI * -2, Math.PI * 2)
                cubeFolderPin.add(group.position, 'y', Math.PI * -2, Math.PI * 2)
                cubeFolderPin.add(group.position, 'z', Math.PI * -2, Math.PI * 2)
                cubeScalePin.add(group.scale, 'x', 0, 1)
                cubeScalePin.add(group.scale, 'y', 0, 1)
                cubeScalePin.add(group.scale, 'z', 0, 1)
                cubeRotationPin.add(group.rotation, 'x', -1, 1)
                cubeRotationPin.add(group.rotation, 'y', -1, 1)
                cubeRotationPin.add(group.rotation, 'z', -1, 1)
            }

            if (scene.children.find(el => el.type === "HemisphereLight")) {
                const light = scene.children.find(el => el.type === 'HemisphereLight');
                const lightF = gui.addFolder('HemisphereLight');
                lightF.add(light, 'intensity', 0, 3.5);
                lightF.add(light.position, 'x', -3.5, 5);
                lightF.add(light.position, 'y', -3.5, 5);
                lightF.add(light.position, 'z', -3.5, 5);
                var conf = { color : '#ffae23' };    
                gui.addColor(conf, 'color').onChange( function(colorValue) {
                    light.color.set(colorValue);
                });
                gui.addColor(conf, 'color').onChange( function(colorValue) {
                    console.log(colorValue);
                    light.groundColor.set(colorValue);
                });
                
            }
            if (scene.children.find(el => el.name === "pin")) {
                const light = scene.children.find(el => el.name === 'pin');
                const lightF = gui.addFolder('pin');
                lightF.add(light.position, 'x', -3.5, 5);
                lightF.add(light.position, 'y', -3.5, 5);
                lightF.add(light.position, 'x', -3.5, 5);
                lightF.add(light.rotation, 'x', -3.5, 5);
                lightF.add(light.rotation, 'y', -3.5, 5);
                lightF.add(light.rotation, 'z', -3.5, 5);
                lightF.add(light.material, 'roughness', 0, 1);
                lightF.add(light.material, 'metalness', 0, 1);
                var conf = { color : '#cb9090' };    
                gui.addColor(conf, 'color').onChange( function(colorValue) {
                    light.material.color.set(colorValue);
                });
                // gui.addColor(conf, 'color').onChange( function(colorValue) {
                //     console.log(colorValue);
                //     light.groundColor.set(colorValue);
                // });
                
            }
            if (scene.children.find(el => el.name === "inner-pin")) {
                const light = scene.children.find(el => el.name === 'inner-pin');
                const lightF = gui.addFolder('inner-pin');
                lightF.add(light.position, 'x', -3.5, 5);
                lightF.add(light.position, 'y', -3.5, 5);
                lightF.add(light.position, 'z', -3.5, 5);
                lightF.add(light.rotation, 'x', -3.5, 5);
                lightF.add(light.rotation, 'y', -3.5, 5);
                lightF.add(light.rotation, 'z', -3.5, 5);
                lightF.add(light.material, 'roughness', 0, 1);
                lightF.add(light.material, 'metalness', 0, 1);
                var conf = { color : '#cb9090' };    
                gui.addColor(conf, 'color').onChange( function(colorValue) {
                    light.material.color.set(colorValue);
                });
                // gui.addColor(conf, 'color').onChange( function(colorValue) {
                //     console.log(colorValue);
                //     light.groundColor.set(colorValue);
                // });
                
            }
            if (scene.children.find(el => el.name === "planet")) {
                const light = scene.children.find(el => el.name === 'planet');
                const lightF = gui.addFolder('planet');
                lightF.add(light.position, 'x', -3.5, 5);
                lightF.add(light.position, 'y', -3.5, 5);
                lightF.add(light.position, 'x', -3.5, 5);
                lightF.add(light.rotation, 'x', -3.5, 5);
                lightF.add(light.rotation, 'y', -3.5, 5);
                lightF.add(light.rotation, 'z', -3.5, 5);
                lightF.add(light.material, 'roughness', 0, 1);
                lightF.add(light.material, 'metalness', 0, 1);
                var conf = { color : '#cb9090' };    
                gui.addColor(conf, 'color').onChange( function(colorValue) {
                    light.material.color.set(colorValue);
                });
                // gui.addColor(conf, 'color').onChange( function(colorValue) {
                //     console.log(colorValue);
                //     light.groundColor.set(colorValue);
                // });
                
            }
            if (scene.children.find(el => el.name === "DirLight")) {
                const light = scene.children.find(el => el.name === 'DirLight');
                const lightF = gui.addFolder('DirLight');
                lightF.add(light, 'intensity', 0, 540);
                lightF.add(light.position, 'x', -10, 20);
                lightF.add(light.position, 'y', -10, 20);
                lightF.add(light.position, 'z', -10, 20);
                var conf = { color : '#ffffff' };    
                gui.addColor(conf, 'color').onChange( function(colorValue) {
                    light.color.set(colorValue);
                });
                
            }
            if (scene.children.find(el => el.name === "space")) {
                const light = scene.children.find(el => el.name === 'space');
                const materialFolder = gui.addFolder('Space Material');
                materialFolder.add(light.material, 'bumpScale', 0, 1).name('Bump Scale');
                materialFolder.addColor(light.material, 'emissive').name('Emissive Color');
                materialFolder.add(light.material, 'flatShading').name('Flat Shading');
                materialFolder.add(light.material, 'fog').name('Fog');
                materialFolder.add(light.material, 'metalness', 0, 1).name('Metalness');
                materialFolder.add(light.material, 'roughness', 0, 1).name('Roughness');
                materialFolder.add(light.material, 'blending', {
                NoBlending: THREE.NoBlending,
                NormalBlending: THREE.NormalBlending,
                AdditiveBlending: THREE.AdditiveBlending,
                SubtractiveBlending: THREE.SubtractiveBlending,
                MultiplyBlending: THREE.MultiplyBlending
                }).name('Blending');
                
            }
            if (scene.children.find(el => el.name === "sun")) {
                const light = scene.children.find(el => el.name === 'sun');
                const materialFolder = gui.addFolder('sun Material');
                materialFolder.add(light.position, 'x', -10, 20);
                materialFolder.add(light.position, 'y', -10, 20);
                materialFolder.add(light.position, 'z', -10, 20);
                materialFolder.add(light.material, 'fog').name('Fog');
                materialFolder.add(light.material, 'blending', {
                NoBlending: THREE.NoBlending,
                NormalBlending: THREE.NormalBlending,
                AdditiveBlending: THREE.AdditiveBlending,
                SubtractiveBlending: THREE.SubtractiveBlending,
                MultiplyBlending: THREE.MultiplyBlending
                }).name('Blending');
                
            }
        }, 3000);
    }

    addInnerPin() {
        const geo = new THREE.CylinderGeometry(0.025,0.025,0.01, 64,64);
        const mat = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#4e6097'),
            blending: THREE.CustomBlending,
            // metalness: 0.75,
            reflectivity: 0.5,
            transparent: true,
            // alphaTest: 0.002
        });
        const mish = new THREE.Mesh(geo,mat);
        mish.position.set(0.49,0.03,0.1955);
        mish.rotation.set(0, -0.2975,1.5385);
        mish.scale.multiplyScalar(0.28);
        // mish.rotation.y = 1.1305;
        mish.name = 'inner-pin';
        return mish;
    }
    addPin() {
        const geo = new THREE.RingGeometry(0.025, 0.04, 30);
        const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#ffffff'),
            blending: THREE.CustomBlending,
            metalness: 0.1,
            transparent: true,
            opacity: 0.35
            // alphaTest: 0.002
        });
        const mish = new THREE.Mesh(geo,mat);
        mish.position.set(0.49,0.03,0.1955);
        mish.rotation.y = 1.1305;
        mish.name = 'pin';
        mish.scale.multiplyScalar(0.35);
        return mish;
    }

    addLight() {
        // const directionalLight = new THREE.PointLight('#ffc766', 50);
        const directionalLight = new THREE.PointLight('#c2ccff', 70);
        directionalLight.position.set(4.5,0.84,1.56);
        directionalLight.name = 'DirLight';
        // directionalLight.castShadow  = true;
        return directionalLight;
    }

    createSpaceSphere(scene) {
        const innerGeometry = new THREE.CylinderGeometry( 5, 5, 10, 32 );
        // const innerGeometry = new THREE.SphereGeometry(4, 32 , 64);

        const texture =  new THREE.TextureLoader().load(`${window.defaultModulePath}/images/Space_4K.jpg`,);

        const material2 = new THREE.MeshStandardMaterial( {
                map: texture,
                lightMap: texture,
                roughness: 0.85,
                metalness: 0.924,
                fog: false
        });

        const mesh2 = new THREE.Mesh( innerGeometry, material2 );
        mesh2.name = 'space';
        mesh2.material.side = THREE.BackSide;
        scene.add(mesh2);
    }

    createSun(scene) {
        const innerGeometry = new THREE.CircleGeometry(2.5, 32)
        const texture =  new THREE.TextureLoader().load(`${window.defaultModulePath}/images/sun3.webp`,);
        const material2 = new THREE.MeshBasicMaterial( {
                map: texture,
                alphaMap: texture,
                transparent: true,
                alphaTest: 0.1
        });

        const mesh2 = new THREE.Mesh( innerGeometry, material2 );
        mesh2.name = 'sun';
        mesh2.position.set(4,0.9,1.45);
        scene.add(mesh2);
    }
    
    createBlumSphere() {
        var geometry = new THREE.SphereGeometry(0.68, 64, 32);        
        var material = new THREE.ShaderMaterial( 
            {
                uniforms: {  },
                vertexShader:   vShader,
                fragmentShader: fShader,
                side: THREE.BackSide,
                
                // blending: THREE.CustomBlending,
                transparent: true
            }   );
        // vertexShader fragmentShader
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(-6.2,-2.67,-6.28);
        
        return mesh;
    }

    goToScreen() {
        document.body.removeEventListener('click', this.goToScreen);

        this.disableHover();

        const isMobileLinkRendered = document.querySelector('.s3d-earth__mob-link');

        if (!isDesktop() && !isMobileLinkRendered) {
            document.body.insertAdjacentHTML('beforeend',$mobileLink);
            return;
        } 
        if (isDesktop()) {
            this.parent.updateFsm({ type: 'map' });
        }
    }

    enableHover() {
        if (this.goToScreenInit) return;
        document.body.addEventListener('click', this.goToScreen);
        document.body.style.cursor = 'pointer';
        this.pinScaleIn();
        if (isDesktop()) {
            this.tooltip = tippy(document.body, {
                content: "Trojena",
                followCursor: true,
                plugins: [followCursor]
            });
            this.tooltip.show();
        }
        this.goToScreenInit = true;
        
    }

    pinScaleIn() {
        gsap.to(this.scene.children.find(el => el.name === 'pin').scale, {
            x: 0.5, y: 0.5, z: 0.5, duration: 0.35
        })
        gsap.to(this.scene.children.find(el => el.name === 'inner-pin').scale, {
            x: 0.5, y: 0.5, z: 0.5, duration: 0.35
        })
    }

    pinScaleOut() {
        gsap.to(this.scene.children.find(el => el.name === 'inner-pin').scale, {
            x: 0.3, y: 0.3, z: 0.3, duration: 0.35
        })
        gsap.to(this.scene.children.find(el => el.name === 'pin').scale, {
            x: 0.32, y: 0.32, z: 0.32, duration: 0.35
        })
    }

    disableHover() {
        if (!this.goToScreenInit) return;
        document.body.removeEventListener('click', this.goToScreen);
        document.body.style.cursor = '';
        this.pinScaleOut();
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = false;
        }
        this.goToScreenInit = false;
    }
    initNavigation() {
        console.log(this.controls);
        this.wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-earth-left]');
            this.controls.autoRotate = true;
            this.controls.update();
            if (!target) return;
        });
        this.wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-earth-right]');
            if (!target) return;
        });
    }
    rotation() {
        const rotateButtonClockwise = document.getElementById('rotateButtonClockwise');
        const rotateButtonCounterClockwise = document.getElementById('rotateButtonCounterClockwise');
        
        this.isRotatingClockwise = false;
        this.isRotatingCounterClockwise = false;

        const downevent = isDesktop() ? 'mousedown' : 'touchstart';
        const upevent = isDesktop() ? 'mouseup' : 'touchend';
        
        rotateButtonClockwise.addEventListener(downevent, () => {
          this.isRotatingClockwise = true;
        });
        
        rotateButtonClockwise.addEventListener(upevent, () => {
          this.isRotatingClockwise = false;
        });
        
        rotateButtonCounterClockwise.addEventListener(downevent, () => {
          this.isRotatingCounterClockwise = true;
        });
        
        rotateButtonCounterClockwise.addEventListener(upevent, () => {
          this.isRotatingCounterClockwise = false;
        });
    }

    initTutorial() {
        const tutorialContainer = document.querySelector('[data-earth-tutorial]');
        this.wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-earth-tutorial-open]');
            if (!target) return;
            tutorialContainer.classList.toggle('active');
        });
        this.wrapper.addEventListener('click', (evt) => {
            const target = evt.target.closest('[data-earth-tutorial-close]');
            if (!target) return;
            tutorialContainer.classList.remove('active');
        });
    }
}