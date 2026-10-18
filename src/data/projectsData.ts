import type { ProjectNode, ServiceOffering, EngineeringDiscipline } from '../types/portfolio';

export interface TyreeResumeProfile {
  name: string;
  role: string;
  bio: string;
  university: string;
  degree: string;
  graduationDate: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  skills: {
    languages: string[];
    frameworksAndTools: string[];
    cadAndHardware: string[];
    platforms: string[];
  };
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
}

export const TYREE_PROFILE: TyreeResumeProfile = {
  name: 'Tyree Holt',
  role: 'Mechanical Engineer & Creative Technologist',
  bio: 'First-year Mechanical Engineering student at Illinois Institute of Technology (IIT) combining CAD design, embedded systems, and AI-driven robotics.',
  university: 'Illinois Institute of Technology (IIT)',
  degree: 'B.S. in Mechanical Engineering',
  graduationDate: 'May 2028',
  location: 'Chicago, IL',
  email: 'Tyreeholt1@gmail.com',
  phone: '(872) 381-4570',
  linkedin: 'https://linkedin.com/in/tyree-holt',
  skills: {
    languages: ['C++', 'Python', 'Dart', 'HTML/CSS', 'JavaScript'],
    frameworksAndTools: ['Flutter', 'Firebase', 'WordPress', 'Git', 'GitHub', 'VS Code', 'Antigravity'],
    cadAndHardware: ['Onshape', 'Fusion360', 'SolidWorks', 'Arduino', 'Raspberry Pi', '3D Printing (FDM/SLA)'],
    platforms: ['ROS/Robotics', 'Linux', 'macOS', 'Windows'],
  },
  experience: [
    {
      role: 'Software Developer',
      company: 'Zitnalta Studio',
      period: 'Active Experience',
      description: 'Engineered performant web applications, executed rigorous quality assurance across client codebases, and collaborated on Chrome extension development.',
      highlights: [
        'Responsive full-stack website development and modern interface optimization.',
        'Quality assurance testing, bug tracking, and cross-browser performance profiling.',
        'Collaborative development and testing of Chrome browser extensions.',
      ],
    },
    {
      role: 'Mechanical Team Member',
      company: 'IIT Lunabotics NASA Team',
      period: '2024 - Present',
      description: 'Designing and fabricating an autonomous extraterrestrial mining robot to excavate regolith in simulated lunar conditions at Kennedy Space Center.',
      highlights: [
        'Subsystem mechanical CAD design and structural load validation in Onshape & Fusion360.',
        'Integration of LiDAR visual sensors, computer vision, and autonomous navigation loops.',
      ],
    },
  ],
};

export const DISCIPLINE_CONFIG: Record<
  EngineeringDiscipline,
  {
    name: string;
    label: string;
    color: string;
    glowClass: string;
    borderClass: string;
    bgClass: string;
    badgeClass: string;
    accentHex: string;
  }
> = {
  robotics: {
    name: 'Robotics & Mechanisms',
    label: 'Robotics',
    color: 'text-white',
    glowClass: 'shadow-glow-electric',
    borderClass: 'border-slate-700',
    bgClass: 'bg-sillitha-card',
    badgeClass: 'bg-sillitha-card border-slate-700 text-slate-200',
    accentHex: '#FFFFFF',
  },
  cad: {
    name: 'CAD & 3D Prototyping',
    label: 'CAD / Hardware',
    color: 'text-white',
    glowClass: 'shadow-glow-electric',
    borderClass: 'border-slate-700',
    bgClass: 'bg-sillitha-card',
    badgeClass: 'bg-sillitha-card border-slate-700 text-slate-200',
    accentHex: '#A0A0A0',
  },
  software: {
    name: 'Full-Stack & Mobile Development',
    label: 'Software / Apps',
    color: 'text-white',
    glowClass: 'shadow-glow-electric',
    borderClass: 'border-slate-700',
    bgClass: 'bg-sillitha-card',
    badgeClass: 'bg-sillitha-card border-slate-700 text-slate-200',
    accentHex: '#FFFFFF',
  },
  hardware: {
    name: 'Embedded Systems & Automation',
    label: 'Embedded',
    color: 'text-white',
    glowClass: 'shadow-glow-electric',
    borderClass: 'border-slate-700',
    bgClass: 'bg-sillitha-card',
    badgeClass: 'bg-sillitha-card border-slate-700 text-slate-200',
    accentHex: '#A0A0A0',
  },
  ai: {
    name: 'Target Tracking & Vision AI',
    label: 'Vision & AI',
    color: 'text-white',
    glowClass: 'shadow-glow-electric',
    borderClass: 'border-slate-700',
    bgClass: 'bg-sillitha-card',
    badgeClass: 'bg-sillitha-card border-slate-700 text-slate-200',
    accentHex: '#FFFFFF',
  },
};

export const PROJECTS_DATA: ProjectNode[] = [
  {
    id: 'mechanical-spider-arms',
    title: 'Mechanical Spider Arms',
    subtitle: 'Project Leader — 7-DOF Articulated Robotic Harness',
    discipline: 'robotics',
    status: 'Field Tested',
    featured: true,
    radialPosition: {
      spokeAngleDeg: 270, // Top vertical spoke (position 0 / 12)
      ringFraction: 0.75,
    },
    canvasCoords: { xPercent: 50, yPercent: 18 },
    shortSummary:
      'Led a team of 4 to design and build functional, 7-degree-of-freedom mechanical spider arms inspired by Superior Spider-Man. Features joint articulation comparable to NASA robotic servicing systems—directing CAD design, kinematics testing, and maintenance.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Degrees of Freedom', value: '7-DOF Joint Articulation', change: 'NASA Servicing Class' },
      { label: 'Team Leadership', value: 'Team of 4 Engineers', change: 'Project Lead' },
      { label: 'CAD Toolchain', value: 'Onshape & Fusion360', change: 'Parametric assemblies' },
      { label: 'Actuation', value: 'High-Torque Servos', change: 'Closed-loop control' },
    ],
    tags: ['Onshape', 'Fusion360', 'C++', 'Arduino', 'Robotics Kinematics', 'Additive Manufacturing'],
    connectedNodeIds: ['iit-lunabotics', 'sk8tyr-app', 'five-axis-printer'],
    fullDocumentation: {
      overview:
        'The Mechanical Spider Arms project was conceived and executed as an advanced wearable robotic platform inspired by Superior Spider-Man. As Project Leader, Tyree Holt directed a four-person engineering team to design, CAD-model, 3D print, and program 4 independent, 7-degree-of-freedom robotic arms. The joint range of motion and articulation architecture was benchmarked against NASA robotic satellite servicing arms.',
      challenge:
        'Achieving high rigidity and strength-to-weight ratio while maintaining 7 independent axes of freedom per arm without user strain or actuator stall torque failure. Cable management and dynamic center-of-gravity shifts required rigorous structural analysis.',
      solution:
        'Modeled complete parametric assemblies in Onshape and Fusion360 with carbon-fiber reinforced nylon linkages, planetary gear reducers, and high-tensile stainless steel pivot pins. Created an Arduino microcontroller harness with synchronized PWM servo signals and safety limit switches.',
      systemArchitecture:
        'Microcontroller-driven master harness communicating with secondary joint controllers via I2C. User input triggers pre-programmed kinematic routines (grasp, deploy, arch, reach) with sub-second response times.',
      techSpecs: [
        { label: 'Joint Kinematics', value: '7 Degrees of Freedom per Arm (28 axes total)' },
        { label: 'Primary CAD System', value: 'Onshape & Autodesk Fusion360' },
        { label: 'Control Microcontroller', value: 'Arduino Mega 2560 & PCA9685 PWM Drivers' },
        { label: 'Structural Fabrication', value: 'Carbon-Fiber Nylon PA12 + Aluminum Spine' },
        { label: 'Power Supply', value: '7.4V 5000mAh High-Discharge LiPo Battery' },
      ],
      schematicSteps: [
        {
          step: '01',
          title: 'Ergonomic Backplate CAD Design',
          detail: 'Contoured spine mount distributed weight across user torso and shoulders.',
          discipline: 'cad',
        },
        {
          step: '02',
          title: '7-DOF Joint Kinematics Modeling',
          detail: 'Calculated forward & inverse kinematics to prevent self-collision between arms.',
          discipline: 'robotics',
        },
        {
          step: '03',
          title: 'Fabrication & Bench Validation',
          detail: '3D printed custom bearing knuckle mounts and load-tested joints to 15 kg/cm torque.',
          discipline: 'cad',
        },
        {
          step: '04',
          title: 'Firmware & Routine Synchronization',
          detail: 'Programmed Arduino motion profiles for smooth spider-arm deployment and gestures.',
          discipline: 'hardware',
        },
      ],
      codeSnippet: {
        language: 'cpp',
        title: 'spider_arm_kinematics_controller.ino (Arduino C++)',
        code: `// Superior Spider-Man 7-DOF Robotic Arm Master Controller
// Lead: Tyree Holt (Team of 4)
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40);

#define SERVO_MIN 150
#define SERVO_MAX 600

struct JointAngle {
  int baseYaw;
  int shoulderPitch;
  int elbowPitch;
  int wristPitch;
  int wristRoll;
  int clawPincer;
};

void deployArmSequence(int armIndex, JointAngle target) {
  // Smooth interpolated trajectory to target angles
  for (float t = 0; t <= 1.0; t += 0.05) {
    int currentPitch = map(t * 100, 0, 100, 90, target.shoulderPitch);
    int pulse = map(currentPitch, 0, 180, SERVO_MIN, SERVO_MAX);
    pwm.setPWM(armIndex * 6 + 1, 0, pulse);
    delay(15);
  }
}

void setup() {
  Serial.begin(115200);
  pwm.begin();
  pwm.setPWMFreq(60);
  Serial.println("SPIDER-ARM 7-DOF SYSTEM INITIALIZED");
}`,
      },
      deliverables: [
        'Complete parametric CAD assembly files in Onshape & Fusion360',
        'Functional 4-arm 7-DOF articulated hardware prototype',
        'Arduino motion-control firmware repository',
        'Structural stress verification and team project documentation',
      ],
      githubUrl: 'https://github.com/sillitha',
      liveDemoUrl: 'https://linkedin.com/in/tyree-holt',
      mediaGallery: [
        {
          title: '7-DOF Joint Articulation CAD',
          type: 'diagram',
          caption: 'Exploded view of servo knuckle mount with dual ball bearings in Onshape.',
          url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
  },
  {
    id: 'iit-lunabotics',
    title: 'IIT Lunabotics NASA Rover',
    subtitle: 'Team Member — Autonomous Regolith Excavator',
    discipline: 'robotics',
    status: 'Active R&D',
    featured: true,
    radialPosition: {
      spokeAngleDeg: 30, // Top-right spoke
      ringFraction: 0.68,
    },
    canvasCoords: { xPercent: 78, yPercent: 32 },
    shortSummary:
      'Contributing to the design and fabrication of an autonomous excavation robot for NASA’s Lunabotics competition at Kennedy Space Center. Working across mechanical subsystems, autonomy software, LIDAR navigation, and computer vision.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'NASA Competition', value: 'Lunabotics Mining', change: 'Kennedy Space Center' },
      { label: 'Perception Suite', value: 'LIDAR + Vision SLAM', change: 'Autonomous navigation' },
      { label: 'University', value: 'Illinois Tech (IIT)', change: 'Mechanical Engineering' },
      { label: 'Target Regolith', value: 'BP-1 Lunar Simulant', change: 'Abrasive handling' },
    ],
    tags: ['NASA Lunabotics', 'IIT', 'LIDAR Navigation', 'Computer Vision', 'Onshape', 'C++', 'Python'],
    connectedNodeIds: ['mechanical-spider-arms', 'bajo-robot', 'five-axis-printer'],
    fullDocumentation: {
      overview:
        'The IIT Lunabotics team represents the Illinois Institute of Technology in NASA’s annual Lunabotics University Challenge at the Kennedy Space Center. The rover is designed to autonomously navigate an abrasive, obstacle-ridden arena modeled after the lunar South Pole, excavate compacted BP-1 regolith simulant, and deposit it into an elevated hopper.',
      challenge:
        'Abrasive regolith particles (<50 microns) easily penetrate bearings and optical sensors. Furthermore, wheel slip in loose extraterrestrial soil causes standard wheel odometry to drift severely during mining cycles.',
      solution:
        'Contributed to the mechanical design of sealed drive enclosures and structural bracing in Onshape and Fusion360. Supported the software integration of 3D LIDAR point clouds and stereoscopic computer vision to maintain accurate drift-free navigation in GPS-denied environments.',
      systemArchitecture:
        'Onboard companion computer running Linux and ROS robotics software stack. High-speed serial buses coordinate motor controllers, linear actuators for the excavation drum, and LIDAR perception pipelines.',
      techSpecs: [
        { label: 'Institution', value: 'Illinois Institute of Technology (IIT)' },
        { label: 'Competition', value: 'NASA Lunabotics (Artemis Student Challenge)' },
        { label: 'Sensors', value: '3D LIDAR + Depth Cameras + 9-DOF IMU' },
        { label: 'Chassis Material', value: '6061-T6 Aluminum & Custom 3D Printed Enclosures' },
        { label: 'Software Stack', value: 'C++, Python, OpenCV, LIDAR SLAM' },
      ],
      schematicSteps: [
        {
          step: '01',
          title: 'Arena LIDAR SLAM Mapping',
          detail: 'Real-time 3D point-cloud generation identifies obstacles and terrain gradients.',
          discipline: 'robotics',
        },
        {
          step: '02',
          title: 'Autonomous Mining Trajectory',
          detail: 'Planner navigates robot to high-yield excavation zones.',
          discipline: 'software',
        },
        {
          step: '03',
          title: 'Regolith Excavation Subsystem',
          detail: 'Mechanical drum buckets penetrate simulant with regulated torque.',
          discipline: 'cad',
        },
        {
          step: '04',
          title: 'Hopper Alignment & Deposition',
          detail: 'Computer vision identifies hopper target for elevated payload dumping.',
          discipline: 'ai',
        },
      ],
      codeSnippet: {
        language: 'python',
        title: 'lidar_obstacle_detector.py (Python / ROS)',
        code: `# IIT Lunabotics Autonomous Obstacle Filtering
import numpy as np

def filter_lidar_ground_plane(point_cloud, height_threshold=0.08):
    """
    Separates lunar regolith floor from obstacle berms and boulders.
    Points above height_threshold are classified as collision hazards.
    """
    points = np.asarray(point_cloud)
    obstacles = points[points[:, 2] > height_threshold]
    ground = points[points[:, 2] <= height_threshold]
    
    # Calculate obstacle centroids for path planner avoidance
    if len(obstacles) > 0:
        centroid = np.mean(obstacles[:, :2], axis=0)
        return {"has_hazard": True, "centroid": centroid, "hazard_count": len(obstacles)}
    return {"has_hazard": False}`,
      },
      deliverables: [
        'CAD assemblies and manufacturing drawings for chassis & bucket drum',
        'Autonomous navigation and obstacle avoidance software modules',
        'Testing logs and field trial validation reports at IIT',
      ],
      githubUrl: 'https://github.com/sillitha',
      liveDemoUrl: 'https://linkedin.com/in/tyree-holt',
      mediaGallery: [
        {
          title: 'Autonomous Excavation Rover Architecture',
          type: 'diagram',
          caption: 'Chassis subsystem packaging and LIDAR sensor mast arrangement.',
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
  },
  {
    id: 'sk8tyr-app',
    title: 'SK8TYR Mobile App',
    subtitle: 'Solo Developer — Flutter & Firebase Skateboarding Community',
    discipline: 'software',
    status: 'Completed',
    featured: true,
    radialPosition: {
      spokeAngleDeg: 120, // Bottom-right spoke
      ringFraction: 0.70,
    },
    canvasCoords: { xPercent: 74, yPercent: 70 },
    shortSummary:
      'Designed and developed a cross-platform Flutter/Firebase social app for skaters to discover and share Chicago skate spots with video uploads, comments, likes, and interactive geolocation maps.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Role', value: 'Solo Full-Stack Dev', change: 'End-to-end design & code' },
      { label: 'Platform', value: 'Flutter & Dart', change: 'iOS & Android' },
      { label: 'Backend', value: 'Google Firebase', change: 'Auth, Firestore, Cloud Storage' },
      { label: 'Key Features', value: 'Video Uploads & Maps', change: 'Spot discovery & likes' },
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Mobile Dev', 'Cloud Storage'],
    connectedNodeIds: ['mechanical-spider-arms', 'bajo-robot', 'five-axis-printer'],
    fullDocumentation: {
      overview:
        'SK8TYR is a native mobile community application conceptualized and engineered from scratch by Tyree Holt. Built to serve the Chicago skateboarding scene, it enables skaters to discover hidden street spots, DIY parks, and ledges, tag geolocation coordinates, upload trick clips, and interact with the local community through comments and likes.',
      challenge:
        'Handling high-definition user video uploads and rendering interactive custom map markers without lagging the feed or exceeding free-tier database read quotas.',
      solution:
        'Engineered an asynchronous media compression pipeline prior to Firebase Cloud Storage upload, paired with client-side Firestore caching and custom Google Maps clustering for smooth spot exploration.',
      systemArchitecture:
        'Flutter UI with Provider state management, integrated with Firebase Authentication, Cloud Firestore real-time database, Firebase Cloud Storage, and Google Maps SDK.',
      techSpecs: [
        { label: 'Framework', value: 'Flutter 3.x (Dart)' },
        { label: 'Backend Database', value: 'Google Cloud Firestore Realtime NoSQL' },
        { label: 'Media Storage', value: 'Firebase Cloud Storage (Video & Image CDN)' },
        { label: 'Mapping & Geo', value: 'Google Maps Flutter SDK + Geoflutterfire' },
        { label: 'Authentication', value: 'Firebase Auth (Email, Google OAuth)' },
      ],
      schematicSteps: [
        {
          step: '01',
          title: 'UI/UX Prototype in Figma',
          detail: 'Created dark-mode high-contrast mobile interface tailored for outdoor screen visibility.',
          discipline: 'software',
        },
        {
          step: '02',
          title: 'Interactive Spot Map Integration',
          detail: 'Custom map style pinpoints Chicago spots with photos, stair counts, and surface quality.',
          discipline: 'software',
        },
        {
          step: '03',
          title: 'Video Feed & Social Interactions',
          detail: 'Real-time clip player with like counters, comment threads, and user profiles.',
          discipline: 'software',
        },
        {
          step: '04',
          title: 'Cross-Platform Build & Testing',
          detail: 'Compiled for iOS and Android with optimized 60 FPS scrolling and offline caching.',
          discipline: 'software',
        },
      ],
      codeSnippet: {
        language: 'dart',
        title: 'spot_upload_service.dart (Flutter / Dart)',
        code: `// SK8TYR Spot Discovery Service
// Author: Tyree Holt
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'dart:io';

class SkateSpotService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseStorage _storage = FirebaseStorage.instance;

  Future<void> uploadChicagoSpot({
    required String spotName,
    required double latitude,
    required double longitude,
    required File videoFile,
    required String creatorId,
  }) async {
    // 1. Upload video clip to Firebase Cloud Storage
    String fileName = 'spots/\${DateTime.now().millisecondsSinceEpoch}.mp4';
    UploadTask task = _storage.ref(fileName).putFile(videoFile);
    TaskSnapshot snapshot = await task;
    String videoUrl = await snapshot.ref.getDownloadURL();

    // 2. Write spot entry to Cloud Firestore with GeoPoint
    await _firestore.collection('spots').add({
      'name': spotName,
      'location': GeoPoint(latitude, longitude),
      'videoUrl': videoUrl,
      'creatorId': creatorId,
      'likes': 0,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }
}`,
      },
      deliverables: [
        'Complete Flutter Dart codebase with state management and clean architecture',
        'Firebase backend rules, indexes, and Cloud Storage security policies',
        'Interactive Google Maps integration with Chicago skate spot database',
      ],
      githubUrl: 'https://github.com/sillitha',
      liveDemoUrl: 'https://linkedin.com/in/tyree-holt',
      mediaGallery: [
        {
          title: 'SK8TYR Mobile Spot Feed UI',
          type: 'image',
          caption: 'Dark mode social feed with embedded video clips and Chicago spot map pins.',
          url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
  },
  {
    id: 'five-axis-printer',
    title: '5-Axis 3D Printer',
    subtitle: 'Creator — Non-Planar Multi-Directional Additive Manufacturing',
    discipline: 'cad',
    status: 'Active R&D',
    featured: true,
    radialPosition: {
      spokeAngleDeg: 210, // Bottom-left spoke
      ringFraction: 0.72,
    },
    canvasCoords: { xPercent: 26, yPercent: 72 },
    shortSummary:
      'Designing and building a custom 5-axis 3D printer to enable multi-directional non-planar 3D printing and overcome standard 3-axis overhang limitations without support structures.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Kinematics', value: '5-Axis (XYZ + BC Trunnion)', change: 'Non-planar slicing' },
      { label: 'Overhang Limit', value: 'Up to 90° Supported', change: 'Zero waste support' },
      { label: 'Control Board', value: '32-Bit Dual MCU', change: 'TMC2209 silent steppers' },
      { label: 'CAD Toolchain', value: 'Fusion360 & Onshape', change: 'Custom gantry & cradle' },
    ],
    tags: ['5-Axis 3D Printing', 'Non-Planar Slicing', 'Fusion360', 'Kinematics', 'CNC', 'Marlin / Klipper'],
    connectedNodeIds: ['mechanical-spider-arms', 'iit-lunabotics', 'bajo-robot'],
    fullDocumentation: {
      overview:
        'Standard fused deposition modeling (FDM) 3D printers are constrained to planar 2.5D horizontal slicing (X, Y, Z), resulting in weak layer adhesion along the Z-axis and requiring extensive throwaway support material for overhangs. Tyree Holt is engineering a custom 5-axis 3D printer featuring a motorized B/C trunnion tilting bed to enable true conformal, non-planar printing.',
      challenge:
        'Synchronizing 5 independent kinematic axes (X, Y, Z linear stages plus rotary tilt and rotation) so the nozzle tip remains tangent to curved surfaces without toolhead collisions or coordinate drift.',
      solution:
        'Designed custom CNC machined aluminum gantry plates and 3D printed rigid trunnion bearing blocks in Fusion360. Utilizing a high-precision worm drive reducer on the rotational axes to prevent bed backlash and slippage under payload.',
      systemArchitecture:
        '32-bit Klipper motion controller running on Raspberry Pi, streaming 5-axis kinematic transformations to high-torque NEMA 17 and NEMA 23 stepper motors with TMC2209 silent drivers.',
      techSpecs: [
        { label: 'Kinematic Structure', value: 'Cartesian XYZ + B-Tilt / C-Rotate Trunnion Bed' },
        { label: 'Motion Control', value: 'Klipper Firmware + Raspberry Pi Host' },
        { label: 'Axes Drives', value: 'TMC2209 Stepper Drivers on CAN Bus' },
        { label: 'Build Envelope', value: '200 x 200 x 180 mm 5-Axis Volume' },
        { label: 'Extruder', value: 'Direct-Drive All-Metal Hotend (up to 300°C)' },
      ],
      schematicSteps: [
        {
          step: '01',
          title: 'Trunnion Bed CAD Modeling',
          detail: 'Modeled dual-axis rotational cradle with harmonic gearheads in Fusion360.',
          discipline: 'cad',
        },
        {
          step: '02',
          title: 'Kinematics Vector Transformation',
          detail: 'Calculated tool center point (TCP) offset compensation for tilting build plate.',
          discipline: 'robotics',
        },
        {
          step: '03',
          title: 'Frame Assembly & Stepper Sizing',
          detail: 'Engineered 2020/2040 V-slot aluminum extrusion rigid cube structure.',
          discipline: 'cad',
        },
        {
          step: '04',
          title: 'Non-Planar G-Code Generation',
          detail: 'Configured experimental multi-axis slicing pipelines to print self-supporting domes.',
          discipline: 'hardware',
        },
      ],
      codeSnippet: {
        language: 'cpp',
        title: 'five_axis_kinematics_transform.py (Klipper Kinematics)',
        code: `# 5-Axis Trunnion Kinematic Tool Center Point (TCP) Transform
# Author: Tyree Holt
import math

class FiveAxisTrunnionKinematics:
    def __init__(self, pivot_offset_z=45.0):
        self.pivot_z = pivot_offset_z

    def calculate_tool_offset(self, x, y, z, b_deg, c_deg):
        """
        Transforms workpiece coordinate (x,y,z) into machine space
        based on B-tilt and C-table rotation angles.
        """
        b_rad = math.radians(b_deg)
        c_rad = math.radians(c_deg)

        # Rotate around C axis (Z rotation)
        xc = x * math.cos(c_rad) - y * math.sin(c_rad)
        yc = x * math.sin(c_rad) + y * math.cos(c_rad)

        # Tilt around B axis (Y tilt) with pivot point offset
        xm = xc * math.cos(b_rad) + (z - self.pivot_z) * math.sin(b_rad)
        zm = -xc * math.sin(b_rad) + (z - self.pivot_z) * math.cos(b_rad) + self.pivot_z

        return (xm, yc, zm)`,
      },
      deliverables: [
        'Complete 3D CAD models and bill of materials in Fusion360 & Onshape',
        'Custom Klipper kinematics configuration for 5-axis trunnion table',
        'Functional 5-axis physical prototype currently under bench testing',
      ],
      githubUrl: 'https://github.com/sillitha',
      liveDemoUrl: 'https://linkedin.com/in/tyree-holt',
      mediaGallery: [
        {
          title: '5-Axis Trunnion Cradle CAD',
          type: 'diagram',
          caption: 'Parametric Fusion360 model of the dual-axis rotating bed assembly.',
          url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
  },
  {
    id: 'bajo-robot',
    title: 'Bajo',
    subtitle: 'Robotics & CAD Lead — Automated Target-Tracking Robot',
    discipline: 'robotics',
    status: 'Completed',
    featured: true,
    radialPosition: {
      spokeAngleDeg: 330, // Top-left spoke
      ringFraction: 0.65,
    },
    canvasCoords: { xPercent: 26, yPercent: 32 },
    shortSummary:
      'Target-tracking robot designed to automatically aim and shoot wiffleballs at targets/people; led the mechanical CAD design for the automated 2-axis targeting mechanism and flywheel launcher.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    metrics: [
      { label: 'Role', value: 'CAD & Robotics Lead', change: 'Pan/tilt mechanism' },
      { label: 'Targeting', value: 'Computer Vision AI', change: 'Autonomous aim' },
      { label: 'Launcher', value: 'High-RPM Dual Flywheel', change: 'Feeds wiffleballs' },
      { label: 'Tracking Speed', value: '180° / sec Slew', change: 'High-speed targeting' },
    ],
    tags: ['CAD Design', 'Fusion360', 'OpenCV', 'Python', 'Arduino', 'Robotics Launcher'],
    connectedNodeIds: ['mechanical-spider-arms', 'iit-lunabotics', 'sk8tyr-app'],
    fullDocumentation: {
      overview:
        'Bajo is an automated target-tracking and projectile-launching robot developed to accurately detect, track, and fire wiffleballs at targets and people in real time. As Robotics and CAD Lead, Tyree Holt spearheaded the mechanical design of the 2-axis pan/tilt turret mechanism, motorized ball feeder hopper, and dual high-speed brushless flywheel launcher.',
      challenge:
        'Minimizing mechanical play, backlash, and vibration while rotating a high-RPM spinning flywheel assembly rapidly to acquire dynamic, moving human targets.',
      solution:
        'Designed a lightweight counterbalanced gimbal turret in Fusion360 utilizing ball bearings and GT2 timing belt reductions. Programmed Arduino motor drivers to interface with Python OpenCV color-detection and Haar-cascade tracking scripts running on a companion host.',
      systemArchitecture:
        'Webcam video stream processed via Python OpenCV calculating target pixel offsets from reticle center; sends proportional steering commands to dual-axis stepper/servo motors and engages flywheel feeder.',
      techSpecs: [
        { label: 'Mechanical CAD', value: 'Autodesk Fusion360' },
        { label: 'Degrees of Motion', value: '2-Axis Pan (360°) & Tilt (-15° to +60°)' },
        { label: 'Feeder Subsystem', value: 'Gravity-Fed Spiral Hopper with Micro-Servo Gate' },
        { label: 'Launching Mechanism', value: 'Dual 2400KV BLDC Counter-Rotating Wheels' },
        { label: 'Perception Loop', value: 'Python OpenCV Object & Color Centroid Tracking' },
      ],
      schematicSteps: [
        {
          step: '01',
          title: 'Pan/Tilt Turret CAD Design',
          detail: 'Modeled counterbalanced gimbal housing and motor mounts in Fusion360.',
          discipline: 'cad',
        },
        {
          step: '02',
          title: 'Flywheel Launcher Dynamics',
          detail: 'Calculated wheel compression and exit velocity for consistent trajectory.',
          discipline: 'cad',
        },
        {
          step: '03',
          title: 'OpenCV Target Coordinate Extraction',
          detail: 'Webcam feed detects target centroid and converts pixel error to angular rates.',
          discipline: 'ai',
        },
        {
          step: '04',
          title: 'Automated Firing Verification',
          detail: 'System aligns crosshair to target and triggers feeder gate for verified hits.',
          discipline: 'robotics',
        },
      ],
      codeSnippet: {
        language: 'python',
        title: 'bajo_vision_tracker.py (Python OpenCV)',
        code: `# Bajo Vision & Target Tracking Controller
# Robotics & CAD Lead: Tyree Holt
import cv2
import serial
import time

arduino = serial.Serial('COM3', 115200, timeout=0.1)

def track_and_fire():
    cap = cv2.VideoCapture(0)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    center_x, center_y = frame_width // 2, frame_height // 2

    while True:
        ret, frame = cap.read()
        if not ret: break

        # Detect target centroid (Color / Haar / Contour)
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        mask = cv2.inRange(hsv, (35, 100, 100), (85, 255, 255)) # Target color
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        if contours:
            largest = max(contours, key=cv2.contourArea)
            M = cv2.moments(largest)
            if M["m00"] > 500:
                tx = int(M["m10"] / M["m00"])
                ty = int(M["m01"] / M["m00"])
                err_x = tx - center_x
                err_y = ty - center_y

                # Send pan/tilt micro-steps to Arduino
                arduino.write(f"{err_x},{err_y}\\n".encode())

                # Fire when locked on reticle
                if abs(err_x) < 15 and abs(err_y) < 15:
                    arduino.write(b"FIRE\\n")
                    time.sleep(0.5)

track_and_fire()`,
      },
      deliverables: [
        'Complete Fusion360 CAD assembly & 3D printable STL files',
        'Python OpenCV target-tracking computer vision scripts',
        'Arduino firmware for pan/tilt stepper and flywheel motor control',
      ],
      githubUrl: 'https://github.com/sillitha',
      liveDemoUrl: 'https://linkedin.com/in/tyree-holt',
      mediaGallery: [
        {
          title: 'Pan/Tilt Turret Mechanism CAD',
          type: 'diagram',
          caption: 'Exploded Fusion360 model of 2-axis gimbal and flywheel launcher housing.',
          url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
  },
];

export const SERVICES_DATA: ServiceOffering[] = [
  {
    id: 'web-design-dev',
    title: 'Website design & development',
    discipline: 'software',
    tagline: 'High-performance interactive web experiences, creative technologist hubs, and ultra-fast web apps.',
    description:
      'Designing and developing custom, modern web applications with cutting-edge micro-interactions, responsive mobile-first layouts, and buttery animations. Built with Next.js, React, Tailwind CSS, HTML5 Canvas, and Framer Motion.',
    skills: ['React & Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas & WebGL', 'TypeScript', 'WordPress', 'SEO & Speed'],
    deliverables: [
      'Bespoke modern website architecture',
      'Interactive Canvas animations & physics web graphics',
      'Mobile-first responsive design',
      'Lightning-fast page load speeds & SEO optimization',
    ],
    turnaround: '1 - 3 Weeks',
    iconName: 'Globe',
  },
  {
    id: 'fullstack-dev',
    title: 'Full-stack development',
    discipline: 'software',
    tagline: 'End-to-end mobile & web apps, real-time databases, Chrome extensions, and cloud pipelines.',
    description:
      'From database schemas and cloud infrastructure to robust frontend interfaces. Architecting cross-platform mobile apps in Flutter/Dart with Firebase backends, custom APIs, Chrome extensions, and full-stack software systems.',
    skills: ['Flutter & Dart', 'Firebase (Auth, Firestore)', 'Python & C++', 'Chrome Extensions', 'REST APIs', 'Git & GitHub', 'VS Code & Antigravity'],
    deliverables: [
      'Cross-platform iOS & Android mobile applications',
      'Secure Firebase / Cloud database architectures',
      'Custom Chrome browser extensions and web tools',
      'Automated deployment & version control workflows',
    ],
    turnaround: '2 - 6 Weeks',
    iconName: 'Layers',
  },
  {
    id: 'precision-engineering',
    title: 'Precision engineering',
    discipline: 'cad',
    tagline: 'CAD 3D modeling, robotics kinematics, multi-axis 3D printing, and physical prototyping.',
    description:
      'Connecting the physical and digital realms. Specializing in mechanical CAD modeling in Onshape and Fusion360, robotic arm kinematics (7-DOF), autonomous systems, multi-axis 3D printing, and Arduino/Raspberry Pi embedded integration.',
    skills: ['Onshape & Fusion360', 'SolidWorks CAD', '7-DOF Kinematics', '5-Axis 3D Printing', 'Arduino & Raspberry Pi', 'Robotics & Computer Vision'],
    deliverables: [
      'Parametric 3D CAD assemblies & manufacturing prints',
      'Functional 3D-printed physical mechanisms and prototypes',
      'Arduino / Embedded C++ motor control firmware',
      'Kinematic stress analysis & mechanical documentation',
    ],
    turnaround: '2 - 6 Weeks',
    iconName: 'Cpu',
  },
];
