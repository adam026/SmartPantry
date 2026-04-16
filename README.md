# SmartPantry

A SmartPantry egy Angular + ASP.NET + MongoDB alapú alkalmazás, amely segít nyilvántartani a hűtőben és a tárolóban lévő alapanyagokat, kezelni a bevásárlólistát, valamint recepteket ajánlani a rendelkezésre álló hozzávalók alapján.

## Projekt célja

A projekt az Alkalmazásfejlesztés beadandó részeként készült. A cél egy teljes end-to-end rendszer bemutatása volt a fejlesztéstől egészen a telepítésig.

A beadandóban a következő technológiák és folyamatok kerülnek bemutatásra:

* Angular frontend
* ASP.NET backend REST API
* MongoDB adatbázis
* Docker konténerizálás
* GitHub Actions alapú CI pipeline
* GitHub Container Registry használata
* Kubernetes alapú futtatás
* ArgoCD alapú CD pipeline

---

# Technológiák

* Frontend: Angular
* Backend: ASP.NET Core Web API
* Adatbázis: MongoDB
* Konténerizálás: Docker, Docker Compose
* CI: GitHub Actions
* Registry: GitHub Container Registry (ghcr.io)
* Orchestration: Kubernetes
* CD: ArgoCD

---

# Funkciók

## Tárolók

* Új alapanyag hozzáadása
* Hűtő és Tároló elkülönítése
* Alapanyag hozzáadása a bevásárlólistához
* Alapanyag felhasználtra állítása
* Felhasznált termék törlése vagy bevásárlólistához adása

## Bevásárlólista

* Termékek manuális hozzáadása
* Termék hozzáadása a Tárolók oldalról
* Termékek státuszának módosítása

## Receptek

* Példa receptek megjelenítése
* A rendszer jelzi, hogy a recepthez szükséges hozzávalók rendelkezésre állnak-e

---

# Lokális indítás Docker Compose használatával

## 1. Repository klónozása

```bash
git clone https://github.com/adam026/SmartPantry.git
cd SmartPantry
```

## 2. Konténerek indítása

```bash
docker compose up --build
```

## 3. Elérhetőségek

Frontend:

```text
http://localhost:4200
```

Backend Swagger:

```text
http://localhost:8080/swagger
```

MongoDB:

```text
mongodb://localhost:27017
```

---

# Kubernetes telepítés

## 1. Kubernetes klaszter indítása

Docker Desktop Kubernetes használatával:

1. Nyisd meg a Docker Desktop alkalmazást
2. Navigálj a Kubernetes menüpontra
3. Hozz létre egy új klasztert
4. Válaszd a `kubeadm` típust
5. Kattints a Create gombra
6. Várd meg, amíg a klaszter Running állapotba kerül

Ellenőrzés:

```bash
kubectl get nodes
```

Ha a node `Ready` állapotban van, a klaszter használható.

## 2. Kubernetes erőforrások telepítése

```bash
kubectl apply -f k8s/
```

## 3. Podok ellenőrzése

```bash
kubectl get pods
kubectl get services
```

## 4. Frontend és backend elérése

Frontend:

```bash
kubectl port-forward service/smartpantry-frontend 8081:80
```

Ezután:

```text
http://localhost:8081
```

Backend:

```bash
kubectl port-forward service/smartpantry-backend 8080:8080
```

Swagger:

```text
http://localhost:8080/swagger
```

---

# CI folyamat – GitHub Actions

Minden push után a GitHub Actions automatikusan:

1. Buildeli a frontend és backend Docker image-eket
2. Feltölti azokat a GitHub Container Registry-be
3. Latest taggel publikálja őket

Registry image-ek:

```text
ghcr.io/adam026/smartpantry-backend:latest
ghcr.io/adam026/smartpantry-frontend:latest
```

---

# CD folyamat – ArgoCD

Az ArgoCD figyeli a GitHub repository `k8s` mappáját.

Minden push után:

1. Az ArgoCD érzékeli a módosítást
2. Újraszinkronizálja a klasztert
3. Automatikusan frissíti a deploymenteket

ArgoCD indítása:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8082:443
```

Elérés:

```text
https://localhost:8082
```

---

# Architektúra

```text
Angular Frontend
        ↓
ASP.NET Backend API
        ↓
MongoDB
```

Deployment pipeline:

```text
Git Push
   ↓
GitHub Actions
   ↓
Docker image build
   ↓
GitHub Container Registry
   ↓
ArgoCD
   ↓
Kubernetes Cluster
```

---

# Felhasználói útmutató

## Új alapanyag hozzáadása

1. Nyisd meg a Tárolók oldalt
2. Kattints az „Új alapanyag” gombra
3. Add meg:
   * név
   * mennyiség
   * egység
   * tárolási hely
   * lejárati dátum
4. Kattints a „Hozzáadás” gombra

## Termék hozzáadása a bevásárlólistához

1. Kattints a "Bevásárlólistához" gombra
2. Válaszd ki, hogy szeretnéd-e hozzáadni a bevásárlólistához

## Termék felhasználása

1. Kattints a „Felhasználtam” gombra
2. Válaszd ki, hogy szeretnéd-e hozzáadni a bevásárlólistához

## Bevásárlás kezelése

1. A Bevásárlólista oldalon kattints a „Megvettem” gombra
2. A termék kihúzásra kerül a listáról.

---

# Készítette

Tóth Ádám

Alkalmazásfejlesztés beadandó – SmartPantry
