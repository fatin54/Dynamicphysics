/**
 * Mathematical Physics Unit Test Suite for HSC Dynamics Lab
 * Validates analytical equations against Bangladesh NCTB textbook standards
 * and Board Examination questions (Dhaka, Cumilla, Rajshahi).
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';

console.log('🧪 Starting HSC Dynamics Lab Mathematical Unit Tests...\n');

const g = 9.8; // NCTB Standard gravitational acceleration (m/s²)
const EPSILON = 1e-4; // Numerical tolerance

function approxEqual(actual, expected, tolerance = 0.01, label = '') {
  const diff = Math.abs(actual - expected);
  assert.ok(
    diff <= tolerance,
    `[${label}] Expected ${expected} ± ${tolerance}, but received ${actual} (diff: ${diff.toFixed(5)})`
  );
}

// -------------------------------------------------------------
// 1. Rectilinear Kinematics Tests
// -------------------------------------------------------------
console.log('--- 1. Testing Rectilinear Kinematics ---');

{
  // Test 1.1: Final velocity v = u + at
  // Bus accelerates from rest at 1.8 m/s² for 12 s
  const u = 0;
  const a = 1.8;
  const t = 12;
  const v = u + a * t;
  approxEqual(v, 21.6, EPSILON, 'v = u + at');

  // Test 1.2: Displacement s = ut + 0.5 * a * t^2
  const s = u * t + 0.5 * a * t * t;
  approxEqual(s, 129.6, EPSILON, 's = ut + 0.5 a t^2');

  // Test 1.3: v^2 = u^2 + 2as consistency
  const v_squared = u * u + 2 * a * s;
  approxEqual(Math.sqrt(v_squared), v, EPSILON, 'v^2 = u^2 + 2as');

  // Test 1.4: Distance in t-th second: s_t = u + 0.5 * a * (2t - 1)
  // Displacement in 5th second: s(5) - s(4)
  const s5 = u * 5 + 0.5 * a * 25;
  const s4 = u * 4 + 0.5 * a * 16;
  const deltaS_5 = s5 - s4;
  const formula_s_t = u + 0.5 * a * (2 * 5 - 1);
  approxEqual(deltaS_5, formula_s_t, EPSILON, 's_t = u + 0.5 a (2t - 1)');
  console.log('✓ Rectilinear Kinematics passed.');
}

// -------------------------------------------------------------
// 2. Projectile Motion (Prass / প্রক্ষেপক) Tests
// -------------------------------------------------------------
console.log('\n--- 2. Testing Projectile Motion (Dhaka Board 2017 & Cumilla Board 2017) ---');

{
  // Question: A ball is kicked with u = 30 m/s at θ = 30°
  const u = 30;
  const thetaDeg = 30;
  const thetaRad = (thetaDeg * Math.PI) / 180;

  // Maximum Height: H = (u^2 * sin^2(θ)) / (2g)
  const u_y = u * Math.sin(thetaRad); // 15 m/s
  const H = (u_y * u_y) / (2 * g); // 225 / 19.6 = 11.4796 m
  approxEqual(H, 11.48, 0.01, 'Projectile Max Height H');

  // Time of Flight: T = (2 * u * sin(θ)) / g
  const T = (2 * u_y) / g; // 30 / 9.8 = 3.0612 s
  approxEqual(T, 3.06, 0.01, 'Projectile Time of Flight T');

  // Horizontal Range: R = (u^2 * sin(2θ)) / g
  const R = (u * u * Math.sin(2 * thetaRad)) / g; // (900 * sin(60°)) / 9.8 = 79.533 m
  approxEqual(R, 79.53, 0.02, 'Projectile Horizontal Range R');

  // Trajectory equation: y(x) = x * tan(θ) - (g * x^2) / (2 * u^2 * cos^2(θ))
  // At x = R, y must equal 0
  const y_at_R =
    R * Math.tan(thetaRad) - (g * R * R) / (2 * u * u * Math.pow(Math.cos(thetaRad), 2));
  approxEqual(y_at_R, 0, 0.01, 'Trajectory y(R) = 0');

  // At x = R/2, y must equal H
  const y_at_half_R =
    (R / 2) * Math.tan(thetaRad) -
    (g * Math.pow(R / 2, 2)) / (2 * u * u * Math.pow(Math.cos(thetaRad), 2));
  approxEqual(y_at_half_R, H, 0.01, 'Trajectory y(R/2) = H');

  // Complimentary angles property: Range at θ and (90° - θ) must be identical
  const thetaCompRad = ((90 - thetaDeg) * Math.PI) / 180;
  const R_comp = (u * u * Math.sin(2 * thetaCompRad)) / g;
  approxEqual(R, R_comp, EPSILON, 'Range symmetry R(θ) = R(90 - θ)');

  console.log('✓ Projectile Motion formulas passed.');
}

// -------------------------------------------------------------
// 3. Atwood Machine (Connected Bodies & Pulley) Tests
// -------------------------------------------------------------
console.log('\n--- 3. Testing Atwood Machine (Pulley & Tension) ---');

{
  // Masses m1 = 5 kg, m2 = 3 kg (m1 > m2)
  const m1 = 5;
  const m2 = 3;

  // Analytical acceleration: a = ((m1 - m2) / (m1 + m2)) * g
  const a = ((m1 - m2) / (m1 + m2)) * g; // (2 / 8) * 9.8 = 2.45 m/s²
  approxEqual(a, 2.45, EPSILON, 'Atwood Acceleration a');

  // Tension: T = (2 * m1 * m2 / (m1 + m2)) * g
  const T = ((2 * m1 * m2) / (m1 + m2)) * g; // (30 / 8) * 9.8 = 36.75 N
  approxEqual(T, 36.75, EPSILON, 'Atwood Tension T');

  // Free Body Diagram consistency checks:
  // For mass 1 (moving down): m1 * g - T = m1 * a
  const netF_1 = m1 * g - T;
  const expectedNetF_1 = m1 * a;
  approxEqual(netF_1, expectedNetF_1, EPSILON, 'FBD Mass 1: m1*g - T = m1*a');

  // For mass 2 (moving up): T - m2 * g = m2 * a
  const netF_2 = T - m2 * g;
  const expectedNetF_2 = m2 * a;
  approxEqual(netF_2, expectedNetF_2, EPSILON, 'FBD Mass 2: T - m2*g = m2*a');

  console.log('✓ Atwood Machine FBD and tension formulas passed.');
}

// -------------------------------------------------------------
// 4. Momentum Conservation & 1D Collisions (Elastic & Inelastic)
// -------------------------------------------------------------
console.log('\n--- 4. Testing 1D Collisions & Momentum Conservation ---');

{
  const m1 = 2; // kg
  const m2 = 3; // kg
  const u1 = 10; // m/s
  const u2 = -5; // m/s (approaching in opposite direction)

  // Total Initial Momentum
  const P_initial = m1 * u1 + m2 * u2; // 20 - 15 = 5 kg·m/s
  // Total Initial Kinetic Energy
  const KE_initial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2; // 100 + 37.5 = 137.5 J

  // Case 4.1: Perfectly Elastic Collision (e = 1)
  const e_elastic = 1.0;
  const v1_elastic =
    ((m1 - e_elastic * m2) / (m1 + m2)) * u1 + (((1 + e_elastic) * m2) / (m1 + m2)) * u2;
  const v2_elastic =
    (((1 + e_elastic) * m1) / (m1 + m2)) * u1 + ((m2 - e_elastic * m1) / (m1 + m2)) * u2;

  const P_elastic = m1 * v1_elastic + m2 * v2_elastic;
  const KE_elastic = 0.5 * m1 * Math.pow(v1_elastic, 2) + 0.5 * m2 * Math.pow(v2_elastic, 2);

  approxEqual(P_elastic, P_initial, EPSILON, 'Elastic Momentum Conservation');
  approxEqual(KE_elastic, KE_initial, EPSILON, 'Elastic Kinetic Energy Conservation');

  // Relative velocity of separation = relative velocity of approach
  const v_rel_sep = v2_elastic - v1_elastic;
  const v_rel_app = u1 - u2;
  approxEqual(v_rel_sep, v_rel_app, EPSILON, 'Elastic Relative Velocity e = 1');

  // Case 4.2: Perfectly Inelastic Collision (e = 0, bodies stick together)
  const e_inelastic = 0.0;
  const v_common = (m1 * u1 + m2 * u2) / (m1 + m2); // 5 / 5 = 1.0 m/s
  const v1_inelastic =
    ((m1 - e_inelastic * m2) / (m1 + m2)) * u1 + (((1 + e_inelastic) * m2) / (m1 + m2)) * u2;
  const v2_inelastic =
    (((1 + e_inelastic) * m1) / (m1 + m2)) * u1 + ((m2 - e_inelastic * m1) / (m1 + m2)) * u2;

  approxEqual(v1_inelastic, v_common, EPSILON, 'Inelastic Common Velocity Body 1');
  approxEqual(v2_inelastic, v_common, EPSILON, 'Inelastic Common Velocity Body 2');

  const P_inelastic = (m1 + m2) * v_common;
  const KE_inelastic = 0.5 * (m1 + m2) * Math.pow(v_common, 2); // 0.5 * 5 * 1 = 2.5 J

  approxEqual(P_inelastic, P_initial, EPSILON, 'Inelastic Momentum Conservation');
  assert.ok(
    KE_inelastic < KE_initial,
    `Inelastic KE (${KE_inelastic} J) must be strictly less than initial KE (${KE_initial} J)`
  );

  console.log('✓ Collision equations & energy dissipation passed.');
}

// -------------------------------------------------------------
// 5. Friction & Inclined Plane Mechanics
// -------------------------------------------------------------
console.log('\n--- 5. Testing Static & Kinetic Friction on Incline ---');

{
  const m = 10; // kg
  const mu_s = 0.5;
  const mu_k = 0.4;

  // On flat surface (theta = 0)
  const N_flat = m * g;
  const f_s_max_flat = mu_s * N_flat; // 0.5 * 98 = 49 N
  const f_k_flat = mu_k * N_flat; // 0.4 * 98 = 39.2 N

  approxEqual(f_s_max_flat, 49.0, EPSILON, 'Flat Static Friction Max');
  approxEqual(f_k_flat, 39.2, EPSILON, 'Flat Kinetic Friction');

  // Angle of Repose (নতি কোণ / নিশ্চল কোণ): θ_s = arctan(mu_s)
  const theta_repose_rad = Math.atan(mu_s);
  const theta_repose_deg = (theta_repose_rad * 180) / Math.PI; // ~26.565°
  approxEqual(theta_repose_deg, 26.565, 0.01, 'Angle of Repose');

  // Below repose angle: down-plane gravity component < static friction max -> static equilibrium
  const testThetaRad = (20 * Math.PI) / 180;
  const F_down = m * g * Math.sin(testThetaRad);
  const F_s_max_test = mu_s * m * g * Math.cos(testThetaRad);
  assert.ok(
    F_down < F_s_max_test,
    'Block remains static when angle is strictly below repose angle'
  );

  console.log('✓ Friction & inclined plane mechanics passed.');
}

// -------------------------------------------------------------
// 6. Uniform Circular Motion
// -------------------------------------------------------------
console.log('\n--- 6. Testing Uniform Circular Motion & Centripetal Acceleration ---');

{
  const r = 2.5; // m radius
  const v = 5.0; // m/s speed

  // Angular speed: ω = v / r
  const omega = v / r; // 2.0 rad/s
  approxEqual(omega, 2.0, EPSILON, 'Angular Velocity ω = v / r');

  // Centripetal acceleration: a_c = v^2 / r = ω^2 * r
  const a_c1 = (v * v) / r; // 25 / 2.5 = 10 m/s²
  const a_c2 = omega * omega * r; // 4 * 2.5 = 10 m/s²
  approxEqual(a_c1, 10.0, EPSILON, 'Centripetal Acceleration a_c = v²/r');
  approxEqual(a_c2, 10.0, EPSILON, 'Centripetal Acceleration a_c = ω²r');

  // Period of rotation: T_rev = 2π / ω
  const T_rev = (2 * Math.PI) / omega;
  approxEqual(T_rev, Math.PI, EPSILON, 'Period T = 2π / ω');

  console.log('✓ Circular Motion relationships passed.');
}

// -------------------------------------------------------------
// 7. Testing Ishak Sir Dynamics Curriculum Benchmarks
// -------------------------------------------------------------
console.log('\n--- 7. Testing Ishak Sir Dynamics Curriculum Benchmarks ---');

{
  // Test 7.1: Rain and Umbrella Relative Velocity
  // Cyclist v_c = 5 m/s East, Rain vertical = 5√3 m/s, Wind = 2 m/s East
  const v_cx = 5.0;
  const v_rx = 2.0;
  const v_ry = -5.0 * Math.sqrt(3);
  const v_rel_x = v_rx - v_cx; // -3.0 m/s
  const v_rel_y = v_ry; // -8.660 m/s
  const v_rel_mag = Math.sqrt(v_rel_x * v_rel_x + v_rel_y * v_rel_y); // √84 ≈ 9.165 m/s
  const tan_theta = Math.abs(v_rel_x) / Math.abs(v_rel_y); // 3 / (5√3) ≈ 0.34641
  const theta_deg = (Math.atan(tan_theta) * 180) / Math.PI; // 19.1066°
  approxEqual(v_rel_mag, 9.165, 0.01, 'Ishak Sir Rain-Cyclist Relative Speed');
  approxEqual(theta_deg, 19.11, 0.02, 'Ishak Sir Umbrella Tilt Angle');

  // Test 7.2: Horizontal Projectile Drop from Altitude (Airplane Relief)
  // h = 490 m, u = 75 m/s
  const h_drop = 490;
  const u_plane = 75;
  const t_fall = Math.sqrt((2 * h_drop) / g); // √(980 / 9.8) = 10.0 s
  const x_lead = u_plane * t_fall; // 750 m
  const v_impact = Math.sqrt(u_plane * u_plane + Math.pow(g * t_fall, 2)); // √(75² + 98²) = 123.41 m/s
  approxEqual(t_fall, 10.0, EPSILON, 'Aircraft Package Fall Time');
  approxEqual(x_lead, 750.0, EPSILON, 'Aircraft Package Release Distance');
  approxEqual(v_impact, 123.41, 0.02, 'Aircraft Package Impact Speed');

  // Test 7.3: Range = Height condition
  // R = H => tan θ = 4
  const theta_R_equals_H = (Math.atan(4) * 180) / Math.PI; // 75.9637°
  approxEqual(theta_R_equals_H, 75.96, 0.01, 'R = H Angle tan(θ) = 4');

  // Test 7.4: Complementary Angles Height Product Theorem: R = 4√(H1 H2)
  // For H1 = 20 m, H2 = 45 m => R = 4 * 30 = 120 m
  const H1 = 20;
  const H2 = 45;
  const R_product = 4 * Math.sqrt(H1 * H2);
  approxEqual(R_product, 120.0, EPSILON, 'Complementary Heights Theorem R = 4√(H1 H2)');

  // Test 7.5: Ascending Balloon Stone Drop
  // Balloon ascending at 12 m/s, drops stone from 65 m: 4.9 t² - 12 t - 65 = 0
  const a_quad = 4.9;
  const b_quad = -12;
  const c_quad = -65;
  const disc = Math.sqrt(b_quad * b_quad - 4 * a_quad * c_quad);
  const t_balloon = (-b_quad + disc) / (2 * a_quad); // (12 + 37.656) / 9.8 = 5.067 s
  const v_balloon_impact = Math.sqrt(12 * 12 + 2 * g * 65); // 37.656 m/s
  approxEqual(t_balloon, 5.07, 0.01, 'Ascending Balloon Drop Time');
  approxEqual(v_balloon_impact, 37.66, 0.02, 'Ascending Balloon Impact Speed');

  // Test 7.6: Calculus Motion when a(t) = 0
  // x(t) = 2t³ - 9t² + 12t + 4 => v(t) = 6t² - 18t + 12 => a(t) = 12t - 18
  const t_zero_accel = 18 / 12; // 1.5 s
  const v_at_zero_accel = 6 * Math.pow(t_zero_accel, 2) - 18 * t_zero_accel + 12; // -1.5 m/s
  const x_at_zero_accel = 2 * Math.pow(t_zero_accel, 3) - 9 * Math.pow(t_zero_accel, 2) + 12 * t_zero_accel + 4; // 8.5 m
  approxEqual(t_zero_accel, 1.5, EPSILON, 'Calculus Time for Zero Acceleration');
  approxEqual(v_at_zero_accel, -1.5, EPSILON, 'Calculus Velocity at Zero Acceleration');
  approxEqual(x_at_zero_accel, 8.5, EPSILON, 'Calculus Position at Zero Acceleration');

  // Test 7.7: Earth Equator Centripetal Acceleration
  const R_earth = 6.4e6;
  const omega_earth = (2 * Math.PI) / 86400; // 7.2722e-5
  const a_c_earth = Math.pow(omega_earth, 2) * R_earth;
  approxEqual(a_c_earth, 0.0338, 0.0005, 'Equatorial Centripetal Acceleration');

  // Test 7.8: Tri-Phase Metro Train Motion
  // alpha = 1.2 m/s², beta = 1.8 m/s², total time = 60 s
  const alpha = 1.2;
  const beta = 1.8;
  const total_t = 60;
  const v_max_metro = ((alpha * beta) / (alpha + beta)) * total_t; // 43.2 m/s
  const dist_metro = 0.5 * total_t * v_max_metro; // 1296 m
  approxEqual(v_max_metro, 43.2, EPSILON, 'Tri-Phase Maximum Speed');
  approxEqual(dist_metro, 1296.0, EPSILON, 'Tri-Phase Total Distance');

  console.log('✓ All Ishak Sir Benchmark calculations verified.');
}

// -------------------------------------------------------------
// 8. Relative Velocity & River-Boat / Rain-Umbrella Tests
// -------------------------------------------------------------
console.log('\n--- 8. Testing Relative Velocity: River-Boat & Rain-Umbrella Mechanics ---');

{
  // Test 8.1: River Crossing for Minimum Time vs Shortest Path (Dinajpur Board 2022)
  // Width d = 1.2 km = 1200 m, river current u = 3 km/h = 3/3.6 m/s, boat speed v = 5 km/h = 5/3.6 m/s
  const d_km = 1.2;
  const u_kmh = 3.0;
  const v_kmh = 5.0;

  // Minimum time condition: α = 90°
  const t_min_hours = d_km / v_kmh; // 0.24 hours = 14.4 minutes
  const drift_km = u_kmh * t_min_hours; // 0.72 km = 720 meters
  approxEqual(t_min_hours * 60, 14.4, EPSILON, 'River Minimum Time (14.4 min)');
  approxEqual(drift_km * 1000, 720.0, EPSILON, 'River Drift on Minimum Time (720 m)');

  // Shortest path condition: cos α = -u/v
  const cos_alpha = -u_kmh / v_kmh; // -0.6
  const alpha_deg = (Math.acos(cos_alpha) * 180) / Math.PI; // 126.8699°
  const v_eff_kmh = Math.sqrt(v_kmh * v_kmh - u_kmh * u_kmh); // 4.0 km/h
  const t_shortest_hours = d_km / v_eff_kmh; // 0.30 hours = 18.0 minutes
  approxEqual(alpha_deg, 126.87, 0.01, 'Shortest Path Steering Angle (126.87°)');
  approxEqual(v_eff_kmh, 4.0, EPSILON, 'Shortest Path Effective Velocity (4 km/h)');
  approxEqual(t_shortest_hours * 60, 18.0, EPSILON, 'Shortest Path Time (18.0 min)');

  // Test 8.2: Rain-Umbrella Tilt Angle (Barishal Board 2019)
  // Rain v_r = 6 m/s vertically, cyclist v_c = 8 m/s horizontally
  const v_rain = 6.0;
  const v_cyclist = 8.0;
  const tan_theta_umbrella = v_cyclist / v_rain; // 8 / 6 = 1.3333
  const theta_umbrella_deg = (Math.atan(tan_theta_umbrella) * 180) / Math.PI; // 53.13°
  const v_rain_impact = Math.sqrt(v_rain * v_rain + v_cyclist * v_cyclist); // 10.0 m/s
  approxEqual(theta_umbrella_deg, 53.13, 0.01, 'Rain Umbrella Tilt Angle from Vertical');
  approxEqual(v_rain_impact, 10.0, EPSILON, 'Rain Relative Impact Speed (10 m/s)');

  // Test 8.3: Mid-air Meeting of Balloon Stone and Ground Stone (Rajshahi Board 2021)
  // Stone 1: h0 = 65m, u1 = +12 m/s; Stone 2: u2 = +30 m/s from ground
  // Meeting condition: 65 + 12t - 4.9t² = 30t - 4.9t² => 18t = 65 => t = 65/18 s ≈ 3.611 s
  const t_meet = 65 / 18; // 3.6111 s
  const y_meet = 30 * t_meet - 0.5 * g * t_meet * t_meet; // 30(3.611) - 4.9(13.04) = 108.33 - 63.90 = 44.44 m
  approxEqual(t_meet, 3.611, 0.005, 'Mid-air Stones Meeting Time (3.61 s)');
  approxEqual(y_meet, 44.44, 0.05, 'Mid-air Stones Meeting Altitude (44.44 m)');

  console.log('✓ All Relative Velocity & Multi-Body Motion calculations verified.');
}

// -------------------------------------------------------------
// 9. Chapter 2 Type 1: Dot Product & Cross Product Tests
// -------------------------------------------------------------
console.log('\n--- 9. Testing Chapter 2 Type 1: Dot Product & Cross Product ---');

{
  // Test 9.1: Dot Product, Magnitudes, and Angle (Dhaka Board 2015 Benchmark)
  // A = 2i + 4j - 5k, B = i + 2j + 3k
  const Ax = 2, Ay = 4, Az = -5;
  const Bx = 1, By = 2, Bz = 3;
  const dot = Ax * Bx + Ay * By + Az * Bz; // 2 + 8 - 15 = -5
  approxEqual(dot, -5, EPSILON, 'Dot Product A · B');

  const magA = Math.sqrt(Ax * Ax + Ay * Ay + Az * Az); // √45 = 6.7082
  const magB = Math.sqrt(Bx * Bx + By * By + Bz * Bz); // √14 = 3.7417
  approxEqual(magA, Math.sqrt(45), EPSILON, 'Magnitude |A|');
  approxEqual(magB, Math.sqrt(14), EPSILON, 'Magnitude |B|');

  const cosTheta = dot / (magA * magB);
  const thetaDeg = (Math.acos(cosTheta) * 180) / Math.PI;
  approxEqual(thetaDeg, 101.49, 0.02, 'Angle between vectors θ (101.49°)');

  // Test 9.2: Orthogonality condition (Dhaka Board 2017)
  // A = 2i + mj - 3k, B = 4i - 2j + 6k. When m = -5, A · B must equal 0
  const m = -5;
  const dotOrthogonal = (2 * 4) + (m * -2) + (-3 * 6); // 8 + 10 - 18 = 0
  approxEqual(dotOrthogonal, 0, EPSILON, 'Orthogonal condition A · B = 0 for m = -5');

  // Test 9.3: Cross Product and Parallelogram Area (Cumilla Board 2016)
  // P = 3i - 2j + k, Q = i + 3j - 2k
  // P × Q = | i j k ; 3 -2 1 ; 1 3 -2 | = (4 - 3)i - (-6 - 1)j + (9 + 2)k = 1i + 7j + 11k
  const Px = 3, Py = -2, Pz = 1;
  const Qx = 1, Qy = 3, Qz = -2;
  const Cx = Py * Qz - Pz * Qy; // (-2)(-2) - (1)(3) = 4 - 3 = 1
  const Cy = -(Px * Qz - Pz * Qx); // -[(3)(-2) - (1)(1)] = -[-6 - 1] = 7
  const Cz = Px * Qy - Py * Qx; // (3)(3) - (-2)(1) = 9 + 2 = 11
  approxEqual(Cx, 1, EPSILON, 'Cross Product x-component');
  approxEqual(Cy, 7, EPSILON, 'Cross Product y-component');
  approxEqual(Cz, 11, EPSILON, 'Cross Product z-component');

  const crossMag = Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz); // √(1 + 49 + 121) = √171 ≈ 13.0767
  approxEqual(crossMag, Math.sqrt(171), EPSILON, 'Parallelogram Area |P × Q|');
  const triangleArea = 0.5 * crossMag;
  approxEqual(triangleArea, 6.538, 0.01, 'Triangle Area ½ |P × Q|');

  // Test 9.4: Anticommutativity of Cross Product: (P × Q) = -(Q × P)
  const antiCx = Qy * Pz - Qz * Py;
  const antiCy = -(Qx * Pz - Qz * Px);
  const antiCz = Qx * Py - Qy * Px;
  approxEqual(antiCx, -Cx, EPSILON, 'Anticommutativity x');
  approxEqual(antiCy, -Cy, EPSILON, 'Anticommutativity y');
  approxEqual(antiCz, -Cz, EPSILON, 'Anticommutativity z');

  // Test 9.5: Unit normal vector magnitude must equal 1.0
  const etaMag = Math.sqrt((Cx / crossMag) ** 2 + (Cy / crossMag) ** 2 + (Cz / crossMag) ** 2);
  approxEqual(etaMag, 1.0, EPSILON, 'Unit Normal Vector Magnitude |η̂| = 1');

  console.log('✓ Chapter 2 Type 1: Dot & Cross Product tests passed.');
}

// -------------------------------------------------------------
// 10. Chapter 2 Type 2: Riverboat Navigation & Drift Mechanics
// -------------------------------------------------------------
console.log('\n--- 10. Testing Chapter 2 Type 2: Riverboat Navigation & Drift Mechanics ---');

{
  // Question Scenario: River width d = 500 m, Current u = 3 m/s, Boat speed v = 5 m/s (Dhaka 2019 & Dinajpur 2022)
  const d = 500;
  const u = 3;
  const v = 5;

  // Case A: Minimum Time Crossing (α = 90°)
  const alphaMinDeg = 90;
  const alphaMinRad = (alphaMinDeg * Math.PI) / 180;
  const t_min = d / (v * Math.sin(alphaMinRad)); // 500 / 5 = 100 s
  const drift_min = (u + v * Math.cos(alphaMinRad)) * t_min; // (3 + 0) * 100 = 300 m
  const R_min = Math.sqrt(u * u + v * v); // √(9 + 25) = √34 ≈ 5.831 m/s
  approxEqual(t_min, 100.0, EPSILON, 'Minimum Crossing Time (100 s)');
  approxEqual(drift_min, 300.0, EPSILON, 'Downstream Drift at Min Time (300 m)');
  approxEqual(R_min, Math.sqrt(34), EPSILON, 'Resultant Velocity at 90°');

  // Case B: Shortest Path / Zero Drift (Landing Directly Opposite, x = 0)
  // Condition: cos α = -u/v = -3/5 = -0.6
  const cos_alpha_zd = -u / v;
  const alpha_zd_rad = Math.acos(cos_alpha_zd);
  const alpha_zd_deg = (alpha_zd_rad * 180) / Math.PI; // 126.87°
  const R_zd = Math.sqrt(v * v - u * u); // √(25 - 9) = 4.0 m/s
  const t_zd = d / R_zd; // 500 / 4 = 125 s
  const net_vx_zd = u + v * Math.cos(alpha_zd_rad); // 3 + 5(-0.6) = 0
  const drift_zd = net_vx_zd * t_zd; // 0 m

  approxEqual(alpha_zd_deg, 126.87, 0.01, 'Zero Drift Angle α (126.87°)');
  approxEqual(R_zd, 4.0, EPSILON, 'Effective Perpendicular Speed (4 m/s)');
  approxEqual(t_zd, 125.0, EPSILON, 'Shortest Path Crossing Time (125 s)');
  approxEqual(drift_zd, 0.0, EPSILON, 'Shortest Path Drift (0 m)');

  // Time difference check: Boatman A is faster by exactly 25 seconds
  approxEqual(t_zd - t_min, 25.0, EPSILON, 'Time Difference between Path A and Path B (25 s)');

  // Case C: General Angle Drift (e.g. α = 120°, Dinajpur 2022)
  // Boat speed v = 6 m/s, current u = 3 m/s, d = 500 m
  const v_dinaj = 6;
  const u_dinaj = 3;
  const alpha_120_rad = (120 * Math.PI) / 180;
  const vx_120 = u_dinaj + v_dinaj * Math.cos(alpha_120_rad); // 3 + 6(-0.5) = 0!
  const vy_120 = v_dinaj * Math.sin(alpha_120_rad); // 6 * (√3/2) = 5.196 m/s
  const t_120 = d / vy_120; // 500 / 5.196 = 96.225 s
  const drift_120 = vx_120 * t_120; // 0 m
  approxEqual(vx_120, 0.0, EPSILON, 'Zero horizontal velocity at 120° for v=6, u=3');
  approxEqual(drift_120, 0.0, EPSILON, 'Zero drift at 120° for v=6, u=3');

  console.log('✓ Chapter 2 Type 2: Riverboat Navigation & Drift tests passed.');
}

// -------------------------------------------------------------
// 11. Chapter 2 Type 3: Vector Calculus (Gradient, Divergence & Curl)
// -------------------------------------------------------------
console.log('\n--- 11. Testing Chapter 2 Type 3: Vector Calculus ---');

{
  // Test 11.1: Gradient of Scalar Field φ = 3x²y - yz² + 2xz at (1, -1, 2) (Sylhet Board 2022)
  // ∂φ/∂x = 6xy + 2z => at (1, -1, 2): 6(1)(-1) + 2(2) = -6 + 4 = -2
  // ∂φ/∂y = 3x² - z² => at (1, -1, 2): 3(1)² - (2)² = 3 - 4 = -1
  // ∂φ/∂z = -2yz + 2x => at (1, -1, 2): -2(-1)(2) + 2(1) = 4 + 2 = 6
  const x = 1, y = -1, z = 2;
  const gradX = 6 * x * y + 2 * z;
  const gradY = 3 * x * x - z * z;
  const gradZ = -2 * y * z + 2 * x;
  approxEqual(gradX, -2, EPSILON, 'Gradient x-component at (1, -1, 2)');
  approxEqual(gradY, -1, EPSILON, 'Gradient y-component at (1, -1, 2)');
  approxEqual(gradZ, 6, EPSILON, 'Gradient z-component at (1, -1, 2)');

  // Test 11.2: Divergence and Solenoidal Condition (Jashore Board 2016 & Rajshahi Board 2017)
  // V = (x + 2y)i + (y - 3z)j + (x + az)k
  // ∇ · V = ∂/∂x(x + 2y) + ∂/∂y(y - 3z) + ∂/∂z(x + az) = 1 + 1 + a = 2 + a
  // For solenoidal: 2 + a = 0 => a = -2
  const a_solenoidal = -2;
  const divV = 1 + 1 + a_solenoidal;
  approxEqual(divV, 0, EPSILON, 'Solenoidal field divergence ∇ · V = 0 when a = -2');

  // Test 11.3: Curl and Irrotational Condition (Combined Board 2018)
  // F = (2xy + z³)i + (x² + 2yz)j + (3xz² + y²)k
  // curl F components:
  // curl_x = ∂Fz/∂y - ∂Fy/∂z = 2y - 2y = 0
  // curl_y = -(∂Fz/∂x - ∂Fx/∂z) = -(3z² - 3z²) = 0
  // curl_z = ∂Fy/∂x - ∂Fx/∂y = 2x - 2x = 0
  const curl_x = 2 * y - 2 * y;
  const curl_y = -(3 * z * z - 3 * z * z);
  const curl_z = 2 * x - 2 * x;
  approxEqual(curl_x, 0, EPSILON, 'Curl x-component is zero');
  approxEqual(curl_y, 0, EPSILON, 'Curl y-component is zero');
  approxEqual(curl_z, 0, EPSILON, 'Curl z-component is zero');

  console.log('✓ Chapter 2 Type 3: Vector Calculus (Grad, Div, Curl) tests passed.');
}

// -------------------------------------------------------------
// 12. Testing Canonical CQ Subparts & Historical Import Integrity
// -------------------------------------------------------------
console.log('\n--- 12. Testing Canonical CQ Subpart Utilities & Dataset Integrity ---');

{
  // Test 12.1: Normalization of all variant Bengali and English identifiers
  const { normalizeCQSubpart, getCQSubpartMarks, compareCQSubparts, groupQuestionsByParentCq } = await import('./cqSubparts.mjs');

  assert.equal(normalizeCQSubpart('ka'), 'ka', 'ka normalization');
  assert.equal(normalizeCQSubpart('ক'), 'ka', 'Bengali ক normalization');
  assert.equal(normalizeCQSubpart('CQ_Ka'), 'ka', 'CQ_Ka normalization');
  assert.equal(normalizeCQSubpart('(ক)'), 'ka', '(ক) normalization');

  assert.equal(normalizeCQSubpart('kha'), 'kha', 'kha normalization');
  assert.equal(normalizeCQSubpart('খ'), 'kha', 'Bengali খ normalization');
  assert.equal(normalizeCQSubpart('CQ_Kha'), 'kha', 'CQ_Kha normalization');

  assert.equal(normalizeCQSubpart('ga'), 'ga', 'ga normalization');
  assert.equal(normalizeCQSubpart('গ'), 'ga', 'Bengali গ normalization');
  assert.equal(normalizeCQSubpart('CQ_Ga'), 'ga', 'CQ_Ga normalization');

  assert.equal(normalizeCQSubpart('gha'), 'gha', 'gha normalization');
  assert.equal(normalizeCQSubpart('ঘ'), 'gha', 'Bengali ঘ normalization');
  assert.equal(normalizeCQSubpart('CQ_Gha'), 'gha', 'CQ_Gha normalization');

  // Test 12.2: Standard NCTB Marks Weighting
  assert.equal(getCQSubpartMarks('ka'), 1, 'Ka is 1 mark');
  assert.equal(getCQSubpartMarks('kha'), 2, 'Kha is 2 marks');
  assert.equal(getCQSubpartMarks('ga'), 3, 'Ga is 3 marks');
  assert.equal(getCQSubpartMarks('gha'), 4, 'Gha is 4 marks');

  // Test 12.3: Sorting comparison
  assert.ok(compareCQSubparts('ka', 'kha') < 0, 'ka precedes kha');
  assert.ok(compareCQSubparts('kha', 'ga') < 0, 'kha precedes ga');
  assert.ok(compareCQSubparts('ga', 'gha') < 0, 'ga precedes gha');

  // Test 12.4: Grouping utility
  const mockQuestions = [
    { id: 'q3', parentCqId: 'p1', cqSubpart: 'ga', board: 'Dhaka', year: 2017, questionEn: 'c', questionBn: 'গ', marks: 3, sourceReference: 'ref' },
    { id: 'q1', parentCqId: 'p1', cqSubpart: 'ka', board: 'Dhaka', year: 2017, questionEn: 'a', questionBn: 'ক', marks: 1, sourceReference: 'ref' },
    { id: 'q4', parentCqId: 'p1', cqSubpart: 'gha', board: 'Dhaka', year: 2017, questionEn: 'd', questionBn: 'ঘ', marks: 4, sourceReference: 'ref' },
    { id: 'q2', parentCqId: 'p1', cqSubpart: 'kha', board: 'Dhaka', year: 2017, questionEn: 'b', questionBn: 'খ', marks: 2, sourceReference: 'ref' },
  ];
  const grouped = groupQuestionsByParentCq(mockQuestions);
  assert.equal(grouped.length, 1, 'One parent group created');
  assert.equal(grouped[0].subparts.length, 4, 'Four subparts in group');
  assert.deepEqual(grouped[0].subparts.map(s => s.cqSubpart), ['ka', 'kha', 'ga', 'gha'], 'Subparts strictly sorted ka -> kha -> ga -> gha');

  // Test 12.5: Dataset Subpart Balance Verification from files
  const ch3Raw = fs.readFileSync('./src/data/boardQuestions.ts', 'utf8');
  const ch3JsonStart = ch3Raw.indexOf('[', ch3Raw.indexOf('='));
  const ch3JsonEnd = ch3Raw.lastIndexOf(']') + 1;
  const BOARD_QUESTIONS = JSON.parse(ch3Raw.substring(ch3JsonStart, ch3JsonEnd));

  const vbqRaw = fs.readFileSync('./src/data/vectorBoardQuestions.ts', 'utf8');
  const vbqJsonStart = vbqRaw.indexOf('[', vbqRaw.indexOf('='));
  const vbqJsonEnd = vbqRaw.lastIndexOf(']') + 1;
  const VECTOR_BOARD_QUESTIONS = JSON.parse(vbqRaw.substring(vbqJsonStart, vbqJsonEnd));

  // Check Chapter 3 subparts
  const ch3Ka = BOARD_QUESTIONS.filter(q => q.cqSubpart === 'ka').length;
  const ch3Kha = BOARD_QUESTIONS.filter(q => q.cqSubpart === 'kha').length;
  const ch3Ga = BOARD_QUESTIONS.filter(q => q.cqSubpart === 'ga').length;
  const ch3Gha = BOARD_QUESTIONS.filter(q => q.cqSubpart === 'gha').length;
  assert.ok(ch3Ka > 0, 'Chapter 3 has Ka subparts');
  assert.ok(ch3Kha > 0, 'Chapter 3 has Kha subparts');
  assert.ok(ch3Ga > 0, 'Chapter 3 has Ga subparts');
  assert.ok(ch3Gha > 0, 'Chapter 3 has Gha subparts');

  // Check Chapter 2 Vector subparts
  const ch2Ka = VECTOR_BOARD_QUESTIONS.filter(q => q.cqSubpart === 'ka').length;
  const ch2Kha = VECTOR_BOARD_QUESTIONS.filter(q => q.cqSubpart === 'kha').length;
  const ch2Ga = VECTOR_BOARD_QUESTIONS.filter(q => q.cqSubpart === 'ga').length;
  const ch2Gha = VECTOR_BOARD_QUESTIONS.filter(q => q.cqSubpart === 'gha').length;
  assert.ok(ch2Ka > 0, 'Chapter 2 has Ka subparts');
  assert.ok(ch2Kha > 0, 'Chapter 2 has Kha subparts');
  assert.ok(ch2Ga > 0, 'Chapter 2 has Ga subparts');
  assert.ok(ch2Gha > 0, 'Chapter 2 has Gha subparts');
  assert.equal(ch2Ka, ch2Kha, 'Chapter 2 Ka and Kha are balanced');
  assert.equal(ch2Ga, ch2Gha, 'Chapter 2 Ga and Gha are balanced');

  // Check EV provenance fields
  const evQuestions = VECTOR_BOARD_QUESTIONS.filter(q => q.languageVersion === 'English Version');
  assert.ok(evQuestions.length >= 28, 'At least 28 English Version questions preserved');
  for (const ev of evQuestions) {
    assert.ok(ev.sourceReference, `EV Question ${ev.id} has sourceReference`);
  }

  console.log('✓ Canonical CQ Subparts & Historical Import Integrity tests passed.');
}

// -------------------------------------------------------------
// 13. Dark Mode Theme Architecture & Asset Integrity
// -------------------------------------------------------------
console.log('\n--- 13. Testing Dark Mode Theme Architecture & Asset Integrity ---');

{
  // 13.1 Tailwind darkMode class configuration
  const tailwindConfig = fs.readFileSync('tailwind.config.ts', 'utf-8');
  assert.ok(
    tailwindConfig.includes('darkMode: "class"') || tailwindConfig.includes("darkMode: 'class'"),
    'tailwind.config.ts must enable class-based dark mode (darkMode: "class")'
  );

  // 13.2 Globals CSS color tokens for root and dark mode
  const globalsCss = fs.readFileSync('src/app/globals.css', 'utf-8');
  assert.ok(globalsCss.includes('--sand-bg:'), 'globals.css defines --sand-bg in :root');
  assert.ok(globalsCss.includes('--sand-surface:'), 'globals.css defines --sand-surface in :root');
  assert.ok(globalsCss.includes('.dark {'), 'globals.css defines .dark class');
  assert.ok(globalsCss.includes('--sand-bg: 18 20 23;'), 'globals.css defines dark charcoal background');
  assert.ok(globalsCss.includes('--sand-surface: 24 27 32;'), 'globals.css defines dark card surface');
  assert.ok(globalsCss.includes('--sand-text: 245 245 240;'), 'globals.css defines crisp light text');

  // 13.3 Root Layout Anti-FOUC script and ThemeProvider
  const layoutTsx = fs.readFileSync('src/app/layout.tsx', 'utf-8');
  assert.ok(layoutTsx.includes('suppressHydrationWarning'), 'layout.tsx has suppressHydrationWarning');
  assert.ok(layoutTsx.includes('ThemeProvider'), 'layout.tsx wraps app in ThemeProvider');
  assert.ok(layoutTsx.includes('dynamicphysics-theme'), 'layout.tsx checks localStorage for dynamicphysics-theme');
  assert.ok(layoutTsx.includes('prefers-color-scheme: dark'), 'layout.tsx checks OS prefers-color-scheme in head script');

  // 13.4 ThemeProvider and ThemeToggle components
  const themeProviderTsx = fs.readFileSync('src/components/theme/ThemeProvider.tsx', 'utf-8');
  assert.ok(themeProviderTsx.includes('ThemeContext'), 'ThemeProvider creates ThemeContext');
  assert.ok(themeProviderTsx.includes('toggleTheme'), 'ThemeProvider provides toggleTheme function');

  const themeToggleTsx = fs.readFileSync('src/components/theme/ThemeToggle.tsx', 'utf-8');
  assert.ok(themeToggleTsx.includes('aria-label='), 'ThemeToggle includes accessible aria-label');
  assert.ok(themeToggleTsx.includes('Moon'), 'ThemeToggle includes Moon icon');
  assert.ok(themeToggleTsx.includes('Sun'), 'ThemeToggle includes Sun icon');

  // 13.5 Navbar includes ThemeToggle
  const navbarTsx = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf-8');
  assert.ok(navbarTsx.includes('ThemeToggle'), 'Navbar imports and renders ThemeToggle');
  assert.ok(navbarTsx.includes('<ThemeToggle variant="icon" />'), 'Navbar renders icon toggle');
  assert.ok(navbarTsx.includes('<ThemeToggle variant="expanded" />'), 'Navbar renders expanded toggle in mobile drawer');

  console.log('✓ Dark Mode Theme Architecture & Asset Integrity tests passed.');
}

console.log('\n🎉 ALL MATHEMATICAL PHYSICS UNIT TESTS PASSED SUCCESSFULLY! 🌟\n');
