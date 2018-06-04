# Test for OpenCL support & compatibility
sudo apt install clinfo && clinfo

# Clone github repo
git clone https://github.com/gcp/leela-zero
cd leela-zero/src
sudo apt install libboost-dev libboost-program-options-dev libopenblas-dev opencl-headers ocl-icd-libopencl1 ocl-icd-opencl-dev zlib1g-dev
make
cd ..
wget https://sjeng.org/zero/best_v1.txt.zip
unzip best_v1.txt.zip
src/leelaz --weights weights.txt
