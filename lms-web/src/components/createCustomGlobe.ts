export interface Marker {
  location: [number, number];
  size: number;
  color?: [number, number, number];
  id?: string;
}

export interface Arc {
  from: [number, number];
  to: [number, number];
  color?: [number, number, number];
  id?: string;
}

export interface CustomGlobeOptions {
  width: number;
  height: number;
  phi: number;
  theta: number;
  mapSamples: number;
  mapBrightness: number;
  mapBaseBrightness?: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor?: [number, number, number];
  markers?: Marker[];
  diffuse: number;
  devicePixelRatio: number;
  dark: number;
  opacity?: number;
  offset?: [number, number];
  scale?: number;
  context?: WebGLContextAttributes;

  arcs?: Arc[];
  arcColor?: [number, number, number];
  arcWidth?: number;
  arcHeight?: number;
  markerElevation?: number;
  dashedArcs?: boolean;
  dashDensity?: number;
  removeOzoneGlow?: boolean;
}

export interface CustomGlobe {
  update: (state: Partial<CustomGlobeOptions>) => void;
  destroy: () => void;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string): WebGLProgram | null {
  const vShader = compileShader(gl, gl.VERTEX_SHADER, vert);
  const fShader = compileShader(gl, gl.FRAGMENT_SHADER, frag);
  if (!vShader || !fShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram, names: string[]): Record<string, WebGLUniformLocation | null> {
  const map: Record<string, WebGLUniformLocation | null> = {};
  for (const name of names) {
    map[name] = gl.getUniformLocation(program, name);
  }
  return map;
}

function getAttribs(gl: WebGLRenderingContext, program: WebGLProgram, names: string[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const name of names) {
    map[name] = gl.getAttribLocation(program, name);
  }
  return map;
}

const { PI, sin, cos } = Math;

// Globe Vertex Shader
const GLOBE_VERT = `attribute vec2 a;
void main(){
  gl_Position=vec4(a,0,1);
}`;

// Globe Fragment Shader without Ozone outer & rim shading
const GLOBE_FRAG = `precision highp float;
uniform vec2 t,v,s;
uniform vec3 F,w;
uniform vec4 n;
uniform float k,x,y;
uniform sampler2D z;
float u;
mat3 A(float a,float b){
  float c=cos(a),d=cos(b),e=sin(a),f=sin(b);
  return mat3(d,f*e,-f*c,0,c,e,f,d*-e,d*c);
}
vec3 B(vec3 c,out float G){
  c=c.xzy;
  float q=max(2.,floor(log2(2.236068*k*3.141593*(1.-c.z*c.z))*.72021));
  vec2 g=floor(pow(1.618034,q)/2.236068*vec2(1,1.618034)+.5),
       d=fract((g+1.)*.618034)*6.283185-3.883222,
       e=-2.*g,
       f=vec2(atan(c.y,c.x),c.z-1.),
       r=floor(vec2(e.y*f.x-d.y*(f.y*k+1.),-e.x*f.x+d.x*(f.y*k+1.))/(d.x*e.y-e.x*d.y));
  float o=3.141593;
  vec3 C;
  for(float h=0.;h<4.;h+=1.){
    vec2 D=vec2(mod(h,2.),floor(h*.5));
    float j=dot(g,r+D);
    if(j>k)continue;
    float a=j,b=0.;
    a>=16384.?(a-=16384.,b+=.868872):0.,a>=8192.?(a-=8192.,b+=.934436):0.,a>=4096.?(a-=4096.,b+=.467218):0.,a>=2048.?(a-=2048.,b+=.733609):0.,a>=1024.?(a-=1024.,b+=.866804):0.,a>=512.?(a-=512.,b+=.433402):0.,a>=256.?(a-=256.,b+=.216701):0.,a>=128.?(a-=128.,b+=.108351):0.,a>=64.?(a-=64.,b+=.554175):0.,a>=32.?(a-=32.,b+=.777088):0.,a>=16.?(a-=16.,b+=.888544):0.,a>=8.?(a-=8.,b+=.944272):0.,a>=4.?(a-=4.,b+=.472136):0.,a>=2.?(a-=2.,b+=.236068):0.,a>=1.?(a-=1.,b+=.618034):0.;
    float l=fract(b)*6.283185,i=1.-2.*j*u,m=sqrt(1.-i*i);
    vec3 p=vec3(cos(l)*m,sin(l)*m,i);
    float E=length(c-p);
    if(E<o)o=E,C=p;
  }
  G=o;
  return C.xzy;
}
void main(){
  u=1./k;
  vec2 c=1./t,b=(gl_FragCoord.xy*c*2.-1.)/x-v*vec2(1,-1)*c;
  b.x*=t.x*c.y;
  float a=dot(b,b);
  if(a > 0.642){
    discard;
  }
  float edgeAlpha = smoothstep(0.642, 0.638, a);
  float g;
  vec3 h=normalize(vec3(b,sqrt(max(0.0, 0.64-a))));
  mat3 o=A(s.y,s.x);
  float i=h.z;
  vec3 d=B(h*o,g);
  float j=asin(d.y),e=acos(-d.x/cos(j));
  e=d.z<0.?-e:e;
  float p=max(texture2D(z,vec2(e*.5/3.141593,-(j/3.141593+.5))).x,y),
        q=p*smoothstep(8e-3,0.,g)*pow(i,n.y)*n.x;
  vec4 m=vec4(F*(mix((1.-q)*pow(i,.4),q,n.z)+.1),1.0);
  vec4 l=m*(1.+n.w)*.5;
  gl_FragColor=vec4(l.rgb, l.a * edgeAlpha);
}`;

// Marker / Node Shaders
const MARKER_VERT = `varying vec2 m;
varying vec3 g;
varying float h;
attribute vec2 n;
attribute vec3 p,w;
attribute float q,x;
uniform vec2 b,r;
uniform float i,j,k,s;
void main(){
  float c=cos(j),d=sin(j),e=cos(i),f=sin(i);
  vec3 a=p*(.8+s),l=vec3(e*a.x+f*a.z,f*d*a.x+c*a.y-e*d*a.z,-f*c*a.x+d*a.y+e*c*a.z);
  if(l.z<0.&&length(l.xy)<.8){
    gl_Position=vec4(2,2,0,1);
    return;
  }
  float t=b.y/b.x;
  vec2 y=(l.xy+n*q*2.)*vec2(t,1)*k+r*vec2(1,-1)*k/b;
  gl_Position=vec4(y,0,1);
  m=n;
  g=w;
  h=x;
}`;

const MARKER_FRAG = `precision highp float;
varying vec2 m;
varying vec3 g;
varying float h;
uniform vec3 v;
void main(){
  if(length(m)>.25)discard;
  vec3 a=h>.5?g:v;
  gl_FragColor=vec4(a,1);
}`;

// Arc Shaders with True 3D Dashes
const ARC_VERT = `varying vec3 i;
varying float j,s,t;
varying float u_dash;
attribute vec2 k;
attribute vec3 l,m,N;
attribute float v,w,O;
uniform vec2 g,x;
uniform float y,z,h,A;
mat3 B(float a,float b){
  float c=cos(a),d=cos(b),e=sin(a),f=sin(b);
  return mat3(d,f*e,-f*c,0,c,e,f,d*-e,d*c);
}
vec3 C(vec3 c,vec3 d,vec3 e,float a){
  float b=1.-a;
  return b*b*c+2.*b*a*d+a*a*e;
}
vec3 D(vec3 c,vec3 b,vec3 d,float a){
  float e=1.-a;
  return 2.*e*(b-c)+2.*a*(d-b);
}
void main(){
  mat3 b=B(z,y);
  float c=.8+A;
  vec3 d=l*c,e=m*c,f=l+m;
  float n=length(f);
  vec3 E=n>1e-3?f/n:vec3(0,1,0),o=E*(.8+v);
  float p=k.x;
  vec3 F=C(d,o,e,p),q=b*F,G=D(d,o,e,p),H=b*G;
  vec2 a=H.xy;
  float r=length(a);
  vec2 I=r>1e-3?vec2(-a.y,a.x)/r:vec2(1,0);
  float J=g.x/g.y;
  vec2 K=q.xy*vec2(1./J,1)*h+x*vec2(1,-1)*h/g,P=K+I*w*k.y*h;
  gl_Position=vec4(P,0,1);
  i=N;
  j=O;
  s=q.z;
  t=length(q.xy);
  float ang=acos(clamp(dot(l,m),-1.,1.));
  u_dash=k.x*max(ang,.1)*38.;
}`;

const ARC_FRAG = `precision highp float;
varying vec3 i;
varying float j,s,t;
varying float u_dash;
uniform vec3 M;
void main(){
  if(s<0.&&t<.8)discard;
  if(fract(u_dash)>0.48)discard;
  vec3 a=j>.5?i:M;
  gl_FragColor=vec4(a,1.);
}`;

const RADIUS = 0.8;

function latLonToVector([lat, lon]: [number, number]): [number, number, number] {
  const r = (lat * PI) / 180;
  const a = (lon * PI) / 180 - PI;
  const o = cos(r);
  return [-o * cos(a), sin(r), o * sin(a)];
}

const WORLD_MAP_BASE64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAECklEQVR42u3VsW4jRRzH8d94gzfF4Q0VQaC4vBLTRTp0mze4ggfAPAE5XQEFsGNAVIjwBrmW7h7gJE+giKjyABTZE4g06LKJETdRJvtD65kdz6yduKABiW+TVfzRf2bXYxtcE/59YJCz6YdbgQF6ACSRrwYKYImmh5PbwOewlV3wlQNbAN6SEExjUOO+BU0aCSnxReHABUlK4YFQeJeUT3da8IIkZ6NGoSnFY5KsMoVzMKfECUnqxgPYRArarmUCndHwzIEaQEpg5xVdBXROl8mpAQx5dUgPiHoYAAkg5w3JABR06byGAVgcRGAz5bznj6phBQNRFwyqgdxebH6gshJAesWoFhgYpApAFoG8BIZ/fEhSox5jDjQXmV0Ar5XJfAIrALi3URVs09gHIL4XJCkLC5LH9JWiArABFCSrQjdgkBzRJ0WJeUOSNyQAfJJwUSWUBRlJQ8oGHATACGlBynnzy2kEYLNjrxouigD8BZcgOeVPqh12RtufaCN5wCPVDpvQ9lsIrqndsJtDcWqBCpf4hWN7OdWHBw58FwIaNOU/n1TpMW2DFaD48cmr4185T8NHkpUFX749pQPVdgRKC/DGoQPVeAEKv+WHvY8OOWNTPRp5kHuwSf8wzXtVBKR7YwEH9H3lQUaypUfSATOALyVNu5vZJW31Bnx98nkLfDUWJaz6ixvm+RIQRdl3kmRxxiaDoGnZW4CpPfkaQadlcPim1xOSvETQo7Lv75enVAXJ3xGUlony4KQBBWUM1NiDc6qhyS8RgQs18OCMMtPDaAUIyg0PZkRWDqs+wnKJBTDI1Js6BolegOsKmUxNDBAAKqQyMQmidhegBlLZ+wwKYdv5M/8x1khkb1cgKqP2H+MKyV5vS+whrE8DQDgAlUAoRBX056EElJCjJVACeJBZgNfVp+iCCm4RBWCgKsRxASSA9KgDhDtCiTuMyfHsKXzhC6wNAIjjWb8LKAOA2ctk3FmCOlgKFy8f1N0JJtgsxinYnVAHt4t3gPzZXSCTyCWCQmBT91QE3B5yarSN40dNHYPka4TlDhTUI8zLvl0JSL3vZn6DsCFZOeB2yROEpR68sECQQA++xIGCR2X7DwlEoLRgUrZrqlUg50S1uy43YqDcN6UFBVkhAjWiCV2Q0jgQPdplMKxvBXodcOfAwJYvgdL+1etA1YJJfBcZlQV7sO1i2gHoNiyxtQ5sBsCgWyoxCHiFFd2L5nUTCqMAqGUgsQ9f5kCcCiZgRYkMgMTd5WsB1rTzj0Em14BE4r+QxN1lCEsVur2PoF5Wbg8RJXR4djgvBgauhLywoEZQrt1KKRdVS4CdlJ8qafyP+9KIj/nE/d7kKwH9jgS72e9DV+kvfTWgct4ZyP8Byb8BPG7MaaIIkAQAAAAASUVORK5CYII=";

export default function createCustomGlobe(
  canvas: HTMLCanvasElement,
  opts: CustomGlobeOptions
): CustomGlobe {
  const contextAttrs: WebGLContextAttributes = {
    alpha: true,
    stencil: false,
    antialias: true,
    depth: false,
    preserveDrawingBuffer: false,
    ...opts.context,
  };

  let gl = canvas.getContext("webgl2", contextAttrs) as WebGLRenderingContext | null;
  const isWebGL2 = Boolean(gl);
  if (!gl) {
    gl = canvas.getContext("webgl", contextAttrs) as WebGLRenderingContext | null;
  }

  if (!gl) {
    return {
      destroy: () => {},
      update: () => {},
    };
  }

  const ext = isWebGL2 ? null : gl.getExtension("ANGLE_instanced_arrays");
  const dpr = opts.devicePixelRatio || 1;
  canvas.width = opts.width * dpr;
  canvas.height = opts.height * dpr;

  let phi = opts.phi || 0;
  let theta = opts.theta || 0;
  let markers = opts.markers || [];
  let arcs = opts.arcs || [];
  let mapSamples = opts.mapSamples || 10000;
  let mapBrightness = opts.mapBrightness || 1;
  let mapBaseBrightness = opts.mapBaseBrightness || 0;
  let baseColor = opts.baseColor || [1, 1, 1];
  let markerColor = opts.markerColor || [0.7, 0.7, 0.7];
  let glowColor = opts.glowColor || [0, 0, 0];
  let arcColor = opts.arcColor || [0.7, 0.7, 0.7];
  let arcWidth = opts.arcWidth ?? 0.6;
  let arcHeight = opts.arcHeight ?? 0.3;
  let diffuse = opts.diffuse || 1;
  let dark = opts.dark || 0;
  let opacity = opts.opacity ?? 1;
  let offset = opts.offset || [0, 0];
  let scale = opts.scale || 1;
  let markerElevation = opts.markerElevation ?? 0.05;

  const globeProgram = createProgram(gl, GLOBE_VERT, GLOBE_FRAG);
  const markerProgram = createProgram(gl, MARKER_VERT, MARKER_FRAG);
  const arcProgram = createProgram(gl, ARC_VERT, ARC_FRAG);

  if (!globeProgram) {
    return {
      destroy: () => {},
      update: () => {},
    };
  }

  const quadBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  // Arc mesh: 128 subdivisions for silky smooth dashed arcs
  const arcMeshBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, arcMeshBuf);
  const arcMeshVertices: number[] = [];
  const ARC_SUBDIVS = 128;
  for (let e = 0; e <= ARC_SUBDIVS; e++) {
    const t = e / ARC_SUBDIVS;
    arcMeshVertices.push(t, -1, t, 1);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arcMeshVertices), gl.STATIC_DRAW);

  const markerDataBuf = gl.createBuffer();
  const arcDataBuf = gl.createBuffer();

  const globeUniforms = getUniforms(gl, globeProgram, ["t", "s", "k", "x", "v", "F", "w", "n", "y", "z"]);
  const markerUniforms = markerProgram ? getUniforms(gl, markerProgram, ["i", "j", "b", "k", "r", "v", "s"]) : {};
  const markerAttribs = markerProgram ? getAttribs(gl, markerProgram, ["n", "p", "q", "w", "x"]) : {};
  const arcUniforms = arcProgram ? getUniforms(gl, arcProgram, ["y", "z", "g", "h", "x", "M", "A"]) : {};
  const arcAttribs = arcProgram ? getAttribs(gl, arcProgram, ["k", "l", "m", "v", "w", "N", "O"]) : {};

  const globePosAttr = gl.getAttribLocation(globeProgram, "a");

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    1,
    1,
    0,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0])
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  const img = new Image();
  img.onload = () => {
    if (!gl) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
  };
  img.src = WORLD_MAP_BASE64;

  let totalArcs = 0;

  function setVertexAttribDivisor(index: number, divisor: number) {
    if (isWebGL2 && gl) {
      (gl as any).vertexAttribDivisor(index, divisor);
    } else if (ext) {
      ext.vertexAttribDivisorANGLE(index, divisor);
    }
  }

  function setupAttrib(
    attrLoc: number,
    size: number,
    stride: number,
    offsetBytes: number,
    divisor: number
  ) {
    if (attrLoc < 0 || !gl) return;
    gl.enableVertexAttribArray(attrLoc);
    gl.vertexAttribPointer(attrLoc, size, gl.FLOAT, false, stride, offsetBytes);
    setVertexAttribDivisor(attrLoc, divisor);
  }

  function updateState(next: Partial<CustomGlobeOptions>) {
    if (!gl) return;
    if (next.phi !== undefined) phi = next.phi;
    if (next.theta !== undefined) theta = next.theta;

    if (next.markers) {
      markers = next.markers;
      const data = new Float32Array(8 * markers.length);
      markers.forEach((m, r) => {
        data.set(
          [...latLonToVector(m.location), m.size, ...(m.color || [0, 0, 0]), m.color ? 1 : 0],
          8 * r
        );
      });
      gl.bindBuffer(gl.ARRAY_BUFFER, markerDataBuf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    }

    if (next.arcs) {
      arcs = next.arcs;
      totalArcs = arcs.length;
      const data = new Float32Array(12 * arcs.length);
      arcs.forEach((a, r) => {
        data.set(
          [
            ...latLonToVector(a.from),
            ...latLonToVector(a.to),
            arcHeight + markerElevation,
            0.005 * arcWidth,
            ...(a.color || [0, 0, 0]),
            a.color ? 1 : 0,
          ],
          12 * r
        );
      });
      gl.bindBuffer(gl.ARRAY_BUFFER, arcDataBuf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    }

    if (next.width && next.height) {
      canvas.width = next.width * dpr;
      canvas.height = next.height * dpr;
    }

    if (next.mapSamples !== undefined) mapSamples = next.mapSamples;
    if (next.mapBrightness !== undefined) mapBrightness = next.mapBrightness;
    if (next.mapBaseBrightness !== undefined) mapBaseBrightness = next.mapBaseBrightness;
    if (next.baseColor !== undefined) baseColor = next.baseColor;
    if (next.markerColor !== undefined) markerColor = next.markerColor;
    if (next.glowColor !== undefined) glowColor = next.glowColor;
    if (next.arcColor !== undefined) arcColor = next.arcColor;
    if (next.arcWidth !== undefined) arcWidth = next.arcWidth;
    if (next.arcHeight !== undefined) arcHeight = next.arcHeight;
    if (next.diffuse !== undefined) diffuse = next.diffuse;
    if (next.dark !== undefined) dark = next.dark;
    if (next.opacity !== undefined) opacity = next.opacity;
    if (next.offset !== undefined) offset = next.offset;
    if (next.scale !== undefined) scale = next.scale;
    if (next.markerElevation !== undefined) markerElevation = next.markerElevation;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // 1. Render Globe (No Ozone halo)
    gl.useProgram(globeProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.enableVertexAttribArray(globePosAttr);
    gl.vertexAttribPointer(globePosAttr, 2, gl.FLOAT, false, 0, 0);
    setVertexAttribDivisor(globePosAttr, 0);

    gl.uniform2f(globeUniforms.t!, canvas.width, canvas.height);
    gl.uniform2f(globeUniforms.s!, phi, theta);
    gl.uniform1f(globeUniforms.k!, mapSamples);
    gl.uniform1f(globeUniforms.x!, scale);
    gl.uniform2f(globeUniforms.v!, offset[0] * dpr, offset[1] * dpr);
    gl.uniform3fv(globeUniforms.F!, baseColor);
    gl.uniform3fv(globeUniforms.w!, glowColor);
    gl.uniform4f(globeUniforms.n!, mapBrightness, diffuse, dark, opacity);
    gl.uniform1f(globeUniforms.y!, mapBaseBrightness);
    gl.uniform1i(globeUniforms.z!, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // 2. Render Dashed Arcs
    if (arcProgram && totalArcs > 0) {
      gl.useProgram(arcProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, arcMeshBuf);
      if (arcAttribs.k >= 0) {
        gl.enableVertexAttribArray(arcAttribs.k);
        gl.vertexAttribPointer(arcAttribs.k, 2, gl.FLOAT, false, 0, 0);
        setVertexAttribDivisor(arcAttribs.k, 0);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, arcDataBuf);
      const stride = 48;
      setupAttrib(arcAttribs.l, 3, stride, 0, 1);
      setupAttrib(arcAttribs.m, 3, stride, 12, 1);
      setupAttrib(arcAttribs.v, 1, stride, 24, 1);
      setupAttrib(arcAttribs.w, 1, stride, 28, 1);
      setupAttrib(arcAttribs.N, 3, stride, 32, 1);
      setupAttrib(arcAttribs.O, 1, stride, 44, 1);

      gl.uniform1f(arcUniforms.y!, phi);
      gl.uniform1f(arcUniforms.z!, theta);
      gl.uniform2f(arcUniforms.g!, canvas.width, canvas.height);
      gl.uniform1f(arcUniforms.h!, scale);
      gl.uniform2f(arcUniforms.x!, offset[0] * dpr, offset[1] * dpr);
      gl.uniform3fv(arcUniforms.M!, arcColor);
      gl.uniform1f(arcUniforms.A!, markerElevation);

      const vertexCount = (ARC_SUBDIVS + 1) * 2;
      if (isWebGL2) {
        (gl as any).drawArraysInstanced(gl.TRIANGLE_STRIP, 0, vertexCount, totalArcs);
      } else if (ext) {
        ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, vertexCount, totalArcs);
      } else {
        for (let i = 0; i < totalArcs; i++) {
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
        }
      }
    }

    // 3. Render Markers (Nodes)
    if (markerProgram && markers.length > 0) {
      gl.useProgram(markerProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      if (markerAttribs.n >= 0) {
        gl.enableVertexAttribArray(markerAttribs.n);
        gl.vertexAttribPointer(markerAttribs.n, 2, gl.FLOAT, false, 0, 0);
        setVertexAttribDivisor(markerAttribs.n, 0);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, markerDataBuf);
      const stride = 32;
      setupAttrib(markerAttribs.p, 3, stride, 0, 1);
      setupAttrib(markerAttribs.q, 1, stride, 12, 1);
      setupAttrib(markerAttribs.w, 3, stride, 16, 1);
      setupAttrib(markerAttribs.x, 1, stride, 28, 1);

      gl.uniform1f(markerUniforms.i!, phi);
      gl.uniform1f(markerUniforms.j!, theta);
      gl.uniform2f(markerUniforms.b!, canvas.width, canvas.height);
      gl.uniform1f(markerUniforms.k!, scale);
      gl.uniform2f(markerUniforms.r!, offset[0] * dpr, offset[1] * dpr);
      gl.uniform3fv(markerUniforms.v!, markerColor);
      gl.uniform1f(markerUniforms.s!, markerElevation);

      if (isWebGL2) {
        (gl as any).drawArraysInstanced(gl.TRIANGLES, 0, 6, markers.length);
      } else if (ext) {
        ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, markers.length);
      } else {
        for (let i = 0; i < markers.length; i++) {
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }
    }
  }

  updateState({ markers, arcs });

  return {
    update: updateState,
    destroy: () => {
      if (!gl) return;
      gl.deleteBuffer(quadBuf);
      gl.deleteBuffer(arcMeshBuf);
      gl.deleteBuffer(markerDataBuf);
      gl.deleteBuffer(arcDataBuf);
      if (globeProgram) gl.deleteProgram(globeProgram);
      if (markerProgram) gl.deleteProgram(markerProgram);
      if (arcProgram) gl.deleteProgram(arcProgram);
    },
  };
}
