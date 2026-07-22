import { Config } from "@remotion/cli/config";

// Documentation : https://www.remotion.dev/docs/config
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // null = auto (nombre de cœurs disponibles)

// Qualité d'encodage par défaut (0 = meilleure, 51 = pire ; 18 est visuellement sans perte)
Config.setCrf(18);
